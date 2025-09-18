## **Environment Check**

```bash
dfx --version
~/.cache/dfinity/versions/0.29.0/moc --version
```

Windows/WSL tip:

```bash
dos2unix src/TropaCoinRAO/*.mo 2>/dev/null || true
```

---

## **File Structure**

```text
src/TropaCoinRAO/Lib.mo   ← library (static top‑level, pure helpers)
src/TropaCoinRAO/main.mo  ← persistent actor (state + endpoints)
dfx.json
```

---

## **dfx.json (reference)**

```json
{
  "version": 1,
  "canisters": {
    "TropaCoinRAO": {
      "type": "motoko",
      "main": "src/TropaCoinRAO/main.mo"
    }
  },
  "networks": {
    "local": { "type": "ephemeral" }
  }
}
```

---

## **Clean Build & Deploy**

```bash
dfx stop 2>/dev/null || true
rm -rf .dfx
dfx start --clean --background
dfx deploy TropaCoinRAO
```

---

## **Sanity Checks**

```bash
# initialize supply once if needed
dfx canister call TropaCoinRAO _initMintAllToMintingAccount

dfx canister call TropaCoinRAO icrc1_fee
dfx canister call TropaCoinRAO icrc1_minting_account
dfx canister call TropaCoinRAO icrc1_total_supply

dfx canister call TropaCoinRAO demo_radix_sort '(vec {400:nat;19:nat;20:nat;0:nat;399:nat;8:nat})'
```

## **ICRC‑2 Subscription Example**

```bash
# create spender identity
dfx identity new investor 2>/dev/null || true
INVESTOR_PRINCIPAL=$(dfx identity --identity investor get-principal)

# owner approves spender for 1.4 TPACO (140_000_000 base units)
dfx identity use default
dfx canister call TropaCoinRAO icrc2_approve '(record {
  from_subaccount = null;
  spender = record { owner = principal "'$INVESTOR_PRINCIPAL'"; subaccount = null };
  amount = 140_000_000:nat;
  expected_allowance = null; expires_at = null; fee = null; memo = null; created_at_time = null
})'

# spender pulls funds
dfx identity use investor
OWNER_PRINCIPAL=$(dfx identity --identity default get-principal)
RECIPIENT=$(dfx identity --identity investor get-principal)

dfx canister call TropaCoinRAO icrc2_transfer_from '(record {
  spender_subaccount = null;
  from = record { owner = principal "'$OWNER_PRINCIPAL'"; subaccount = null };
  to   = record { owner = principal "'$RECIPIENT'"; subaccount = null };
  amount = 140_000_000:nat;
  fee = null; memo = null; created_at_time = null
})'
```

---

## **Common Errors & Fixes**

* **M0220** — actor should be `persistent` → declare `persistent actor TropaCoinRAO`.
* **M0219** — implicitly transient → mark runtime maps as `transient let`.
* **M0141** — actor must be only non‑import → move helpers to `Lib.mo`.
* **M0014** — non‑static in library → use literals at `Lib.mo` top level.
* **M0188** — query called shared → queries call private pure helpers only.
* **M0035** — shared/public missing `async` → add explicit `async` return type.
* **M0031** — non‑shared public param (e.g., `Buffer`) → use `[Nat]`.
* **M0005** — case mismatch on Windows/WSL → ensure exact path casing; run `dos2unix`.

---