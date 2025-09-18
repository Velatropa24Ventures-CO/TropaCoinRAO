import Iter      "mo:base/Iter";
import HashMap   "mo:base/HashMap";
import Principal "mo:base/Principal";
import Lib       "Lib";

persistent actor TropaCoinRAO {


  // Minting account (this canister)
  func getMintingAccount() : Lib.Account {
    { owner = Principal.fromActor(TropaCoinRAO); subaccount = null }
  };

  // State 

 var balancesEntries : [(Lib.Account, Nat)] = [];
  transient let balances : HashMap.HashMap<Lib.Account, Nat> = HashMap.fromIter<Lib.Account, Nat>(
    balancesEntries.vals(), 32, Lib.eqAccount, Lib.hashAccount
  );

var allowEntries : [(Lib.AllowKey, Nat)] = [];
  transient let allowances : HashMap.HashMap<Lib.AllowKey, Nat> = HashMap.fromIter<Lib.AllowKey, Nat>(
    allowEntries.vals(), 32, Lib.eqAllowKey, Lib.hashAllowKey
  );

  system func preupgrade() : () {
    balancesEntries := Iter.toArray(balances.entries());
    allowEntries    := Iter.toArray(allowances.entries());
  };

  system func postupgrade() : () {
    balancesEntries := [];
    allowEntries := [];
  };

  // - ICRC-1 subset -

  public func _initMintAllToMintingAccount() : async () {
    let mintAcc = getMintingAccount();
    switch (balances.get(mintAcc)) {
      case (null) { balances.put(mintAcc, Lib.TOTAL_SUPPLY) };
      case (?_) {};
    }
  };

  public query func icrc1_total_supply() : async Nat {
    var total : Nat = 0;
    for ((_, bal) in balances.entries()) { total += bal };
    if (total == 0) { Lib.TOTAL_SUPPLY } else { total }
  };

  public query func icrc1_minting_account() : async ?Lib.Account {
    ?getMintingAccount()
  };

  public query func icrc1_fee() : async Nat { Lib.FEE };

  //  Balance helpers 

  private func getBalance(a : Lib.Account) : Nat {
    switch (balances.get(a)) { case (?x) x; case null 0 }
  };

  private func setBalance(a : Lib.Account, v : Nat) : () {
    if (v == 0) { ignore balances.remove(a) } else { balances.put(a, v) }
  };

  private func credit(a : Lib.Account, amt : Nat) : () {
    setBalance(a, getBalance(a) + amt)
  };

  private func debit(a : Lib.Account, amt : Nat) : Bool {
    let cur = getBalance(a);
    if (cur < amt) { return false };
    setBalance(a, cur - amt);
    true
  };

  //  ICRC-2 (approve / transfer_from lite) 

  public shared ({ caller }) func icrc2_approve(args : Lib.ApproveArgs) : async Lib.TxResult {
    let ownerAcc : Lib.Account = { owner = caller; subaccount = args.from_subaccount };
    let key : Lib.AllowKey = { owner = ownerAcc; spender = args.spender };
    allowances.put(key, args.amount);
    #Ok(allowances.size())
  };

  public shared ({ caller }) func icrc2_transfer_from(args : Lib.TransferFromArgs) : async Lib.TxResult {
    let spenderAcc : Lib.Account = { owner = caller; subaccount = args.spender_subaccount };
    let key : Lib.AllowKey = { owner = args.from; spender = spenderAcc };

    let allowed : Nat = switch (allowances.get(key)) { case (?x) x; case null 0 };
    if (allowed < args.amount) { return #Err(#InsufficientAllowance) };

    let feeToUse : Nat = Lib.FEE;
    if (feeToUse > 0 and getBalance(args.from) < (args.amount + feeToUse)) {
      return #Err(#InsufficientFunds);
    };

    if (not debit(args.from, args.amount + feeToUse)) {
      return #Err(#InsufficientFunds);
    };

    // Fee is burned here; route to a treasury if desired.
    credit(args.to, args.amount);
    allowances.put(key, allowed - args.amount);

    #Ok(balances.size())
  };

  // Public helpers / demos 

  public query func icrc1_balance_of(a : Lib.Account) : async Nat {
    getBalance(a)
  };

  public shared ({ caller }) func _mint(to : Lib.Account, amt : Nat) : async Bool {
    let mintAcc = getMintingAccount();
    if (not Principal.equal(caller, mintAcc.owner)) { return false };
    credit(to, amt);
    true
  };

  public shared ({ caller }) func _burn(from : Lib.Account, amt : Nat) : async Bool {
    let mintAcc = getMintingAccount();
    if (not Principal.equal(caller, mintAcc.owner)) { return false };
    debit(from, amt)
  };

  // Radix sort public query API (pure; does not call shared)
  public query func radixSortBase20Array(input : [Nat]) : async [Nat] {
    Lib.radixSortBase20Array(input)
  };

  public query func demo_radix_sort(nums : [Nat]) : async [Nat] {
    Lib.radixSortBase20Array(nums)
  };
}
