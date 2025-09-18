## **TropaCoinRAO — Motoko (ICRC‑2 + Base‑20 Radix Sort)**

**Overview**
This is a Motoko canister that combines a minimal ICRC ledger feature set with a base‑20 radix sort. It supports the ICRC‑2 Approve → Transfer‑From flow for subscription‑style payments (Angel Investor Plan).
**Highlights**

* ICRC‑1 (subset): `icrc1_total_supply`, `icrc1_minting_account`, `icrc1_fee`
* ICRC‑2: `icrc2_approve`, `icrc2_transfer_from`
* Sorting: base‑20 radix sort via query methods
* Toolchain: DFX 0.29.0 (Motoko 0.29.0)

---

## **Repository Layout**

```text
src/
  TropaCoinRAO/
    Lib.mo     ← library: constants, types, hashing, radix sort (static top‑level literals only)
    main.mo    ← persistent actor: state, ICRC‑1/2 endpoints, query APIs
dfx.json
```

---

## **Token Parameters**

* **Decimals:** 8
* **Genesis Total Supply:** `1,300,000,000,000,000` base units (13,000,000 × 10^8)
* **Default Fee:** `50,000,000` base units (0.5 TPACO, burned by default)
* **Minting Account:** canister principal (returned by `icrc1_minting_account`)

---

## **Prerequisites**

```bash
# Expect 0.29.0
dfx --version
~/.cache/dfinity/versions/0.29.0/moc --version
```

Windows users: run under **WSL2 (Ubuntu)**. If files were edited on Windows, normalize endings:

```bash
dos2unix src/TropaCoinRAO/*.mo 2>/dev/null || true
```

---

## **Build & Deploy (Local)**

```bash
dfx stop 2>/dev/null || true
rm -rf .dfx
dfx start --clean --background
dfx deploy TropaCoinRAO
```

---

## **Smoke Tests**

```bash
# (optional) initialize genesis balances to the canister’s own account
dfx canister call TropaCoinRAO _initMintAllToMintingAccount

# ICRC‑1 subset
dfx canister call TropaCoinRAO icrc1_fee
dfx canister call TropaCoinRAO icrc1_minting_account
dfx canister call TropaCoinRAO icrc1_total_supply

# Base‑20 radix sort demo
dfx canister call TropaCoinRAO demo_radix_sort '(vec {400:nat; 19:nat; 20:nat; 0:nat; 399:nat; 8:nat})'
```

---

## **ICRC‑2 Workflow (Approve → Transfer‑From)**

```bash
# Create a second identity to act as the spender
dfx identity new investor 2>/dev/null || true
INVESTOR_PRINCIPAL=$(dfx identity --identity investor get-principal)

# Owner approves spender for 1.4 TPACO (140_000_000 base units)
dfx identity use default
dfx canister call TropaCoinRAO icrc2_approve '(record {
  from_subaccount = null;
  spender = record { owner = principal "'$INVESTOR_PRINCIPAL'"; subaccount = null };
  amount = 140_000_000:nat;
  expected_allowance = null;
  expires_at = null;
  fee = null;
  memo = null;
  created_at_time = null
})'

# Spender pulls funds from owner to a chosen recipient (self in this demo)
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

## **Base‑20 Radix Sort API**

```bash
# Read‑only, pure queries
dfx canister call TropaCoinRAO radixSortBase20Array '(vec { 20:nat; 19:nat; 400:nat; 0:nat })'
dfx canister call TropaCoinRAO demo_radix_sort        '(vec { 400:nat; 19:nat; 20:nat; 0:nat; 399:nat; 8:nat })'
```

---

## **Design Notes**

* Actor declared **persistent** (required with `stable var`).
* In‑memory maps (`HashMap`) declared **transient** and rebuilt from stable snapshots at upgrade.
* Queries never call shared functions; there’s no `await` inside queries.
* Public entry points use only shared‑safe types (arrays, not buffers).

---

## **Troubleshooting**

* **M0220** — actor should be `persistent` → declare `persistent actor TropaCoinRAO`.
* **M0219** — implicitly transient → mark runtime maps as `transient let`.
* **M0141** — actor must be only non‑import → move helpers to `Lib.mo`.
* **M0014** — non‑static in library → use literals at `Lib.mo` top level.
* **M0188** — query called shared → queries call private pure helpers only.
* **M0035** — shared/public missing `async` → add explicit `async` return type.
* **M0031** — non‑shared public param (`Buffer`) → use `[Nat]`.
* **M0005** — case mismatch on Windows/WSL → ensure exact path casing; run `dos2unix`.

---

## **Branching**

```bash
git checkout -b experiment
git add -A
git commit -m "TropaCoinRAO: ICRC-2 + base-20 radix sort; persistent/transient; build fixes"
git push origin experiment
```

---
