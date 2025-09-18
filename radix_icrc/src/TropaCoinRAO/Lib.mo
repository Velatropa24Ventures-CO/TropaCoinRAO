import Nat       "mo:base/Nat";
import Array     "mo:base/Array";
import Buffer    "mo:base/Buffer";
import Principal "mo:base/Principal";
import Blob      "mo:base/Blob";
import Hash      "mo:base/Hash";
import Nat32     "mo:base/Nat32";

module {
  //  Constants (static literals only) 
  public let DECIMALS : Nat = 8;
  // 10^8 as a literal to keep this static in a library module:
  public let E8 : Nat = 100_000_000;
  public let TOTAL_SUPPLY : Nat = 1_300_000_000_000_000; // 13,000,000 * 100,000,000
  public let FEE : Nat = 50_000_000; // 0.5 TPACO in e8s

  //  Types 
  public type Account = { owner : Principal; subaccount : ?Blob };
  public type AllowKey = { owner : Account; spender : Account };

  public type ApproveArgs = {
    from_subaccount : ?Blob;
    spender : Account;
    amount : Nat;
    expected_allowance : ?Nat;
    expires_at : ?Nat64;
    fee : ?Nat;
    memo : ?Blob;
    created_at_time : ?Nat64;
  };

  public type TransferFromArgs = {
    spender_subaccount : ?Blob;
    from : Account;
    to : Account;
    amount : Nat;
    fee : ?Nat;
    memo : ?Blob;
    created_at_time : ?Nat64;
  };

  public type TxError = {
    #InsufficientAllowance;
    #InsufficientFunds;
    #Unauthorized;
    #BadFee;
    #Other;
  };

  public type TxResult = { #Ok : Nat; #Err : TxError };

  //  Equality / hashing (Hash.Hash = Nat32) 
  public func eqAccount(a : Account, b : Account) : Bool {
    if (not Principal.equal(a.owner, b.owner)) { return false };
    switch (a.subaccount, b.subaccount) {
      case (null, null) true;
      case (?x, ?y) Blob.equal(x, y);
      case _ false;
    }
  };

  public func hashAccount(a : Account) : Hash.Hash {
    let hOwner : Nat32 = Principal.hash(a.owner);
    let hSub   : Nat32 = switch (a.subaccount) { case (null) 0; case (?b) Blob.hash(b) };
    Nat32.bitxor(hOwner * (16_777_619 : Nat32), hSub)
  };

  public func eqAllowKey(a : AllowKey, b : AllowKey) : Bool {
    eqAccount(a.owner, b.owner) and eqAccount(a.spender, b.spender)
  };

  public func hashAllowKey(k : AllowKey) : Hash.Hash {
    let ho = hashAccount(k.owner);
    let hs = hashAccount(k.spender);
    Nat32.bitxor(ho * (2_166_136_261 : Nat32), hs * (16_777_619 : Nat32))
  };

  //  Radix sort (pure) 
  func powNat(base : Nat, exp : Nat) : Nat {
    var result : Nat = 1;
    var e = exp;
    var b = base;
    while (e > 0) {
      if (e % 2 == 1) { result *= b };
      b *= b;
      e /= 2;
    };
    result
  };

  func getDigitBase20(num : Nat, i : Nat) : Nat {
    let divisor = powNat(20, i);
    (num / divisor) % 20
  };

  func digitCountBase20(num : Nat) : Nat {
    if (num == 0) { return 1 };
    var n = num;
    var count : Nat = 0;
    while (n > 0) { n /= 20; count += 1 };
    count
  };

  func mostDigitsBase20(arr : [Nat]) : Nat {
    var maxD : Nat = 0;
    for (v in arr.vals()) {
      let d = digitCountBase20(v);
      if (d > maxD) { maxD := d };
    };
    maxD
  };

  // Private (module-internal) Buffer implementation
  func radixSortBase20_buffer(buf : Buffer.Buffer<Nat>) : [Nat] {
    var arr : [Nat] = Buffer.toArray<Nat>(buf);
    let maxDigits : Nat = mostDigitsBase20(arr);

    var k : Nat = 0;
    while (k < maxDigits) {
      let buckets : [Buffer.Buffer<Nat>] =
        Array.tabulate<Buffer.Buffer<Nat>>(20, func (_ : Nat) : Buffer.Buffer<Nat> {
          Buffer.Buffer<Nat>(0)
        });

      for (v in arr.vals()) {
        let digit = getDigitBase20(v, k);
        buckets[digit].add(v);
      };

      var out : Buffer.Buffer<Nat> = Buffer.Buffer<Nat>(arr.size());
      var i : Nat = 0;
      while (i < 20) {
        let b = buckets[i];
        for (x in b.vals()) { out.add(x) };
        i += 1;
      };
      arr := Buffer.toArray<Nat>(out);
      k += 1;
    };
    arr
  };

  // Public pure array API
  public func radixSortBase20Array(input : [Nat]) : [Nat] {
    let b = Buffer.fromArray<Nat>(input);
    radixSortBase20_buffer(b)
  };
}
