module package::sen;

use sui::coin::{Self, Coin, TreasuryCap};
use sui::event;
use sui::table::{Self, Table};

public struct SEN has drop {}

public struct AdminCap has key, store { id: UID }

public struct PauseState has key, store {
    id: UID,
    is_paused: bool,
}

public struct Allowlist has key, store {
    id: UID,
    allowed_addresses: Table<address, bool>,
}

public struct MintEvent has copy, drop {
    amount: u64,
    recipient: address,
}

public struct BurnEvent has copy, drop {
    amount: u64,
    sender: address,
}

public struct PauseEvent has copy, drop {
    is_paused: bool,
}

public struct AllowlistUpdateEvent has copy, drop {
    address: address,
    allowed: bool,
}

const EPaused: u64 = 1;
const ENotAllowed: u64 = 2;

fun init(witness: SEN, ctx: &mut TxContext) {
    let (treasury, metadata) = coin::create_currency(
        witness,
        6,
        b"SEN",
        b"SEN",
        b"In-game token for SEN game",
        option::none(),
        ctx,
    );
    transfer::public_freeze_object(metadata);
    transfer::public_transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
    transfer::share_object(PauseState {
        id: object::new(ctx),
        is_paused: false,
    });
    transfer::share_object(Allowlist {
        id: object::new(ctx),
        allowed_addresses: table::new(ctx),
    });
    transfer::public_transfer(treasury, ctx.sender());
}

public entry fun mint(
    treasury_cap: &mut TreasuryCap<SEN>,
    pause_state: &PauseState,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    assert!(!pause_state.is_paused, EPaused);
    let coin = coin::mint(treasury_cap, amount, ctx);
    event::emit(MintEvent { amount, recipient });
    transfer::public_transfer(coin, recipient);
}

public entry fun burn(
    treasury_cap: &mut TreasuryCap<SEN>,
    pause_state: &PauseState,
    coin: Coin<SEN>,
    ctx: &mut TxContext,
) {
    assert!(!pause_state.is_paused, EPaused);
    let amount = coin::value(&coin);
    event::emit(BurnEvent { amount, sender: ctx.sender() });
    coin::burn(treasury_cap, coin);
}

public entry fun transfer(
    pause_state: &PauseState,
    allowlist: &Allowlist,
    coin: Coin<SEN>,
    recipient: address,
) {
    assert!(!pause_state.is_paused, EPaused);
    assert!(
        table::contains(&allowlist.allowed_addresses, recipient) || table::is_empty(&allowlist.allowed_addresses),
        ENotAllowed,
    );
    transfer::public_transfer(coin, recipient);
}

public entry fun set_pause(pause_state: &mut PauseState, is_paused: bool, _ctx: &TxContext) {
    pause_state.is_paused = is_paused;
    event::emit(PauseEvent { is_paused });
}

public entry fun update_allowlist(
    allowlist: &mut Allowlist,
    address: address,
    allowed: bool,
    _ctx: &TxContext,
) {
    if (allowed) {
        table::add(&mut allowlist.allowed_addresses, address, true);
    } else {
        table::remove(&mut allowlist.allowed_addresses, address);
    };
    event::emit(AllowlistUpdateEvent { address, allowed });
}

public entry fun lock_tokens(pause_state: &PauseState, coin: Coin<SEN>, ctx: &mut TxContext) {
    assert!(!pause_state.is_paused, EPaused);
    transfer::public_transfer(coin, ctx.sender());
}

public fun balance(coin: &Coin<SEN>): u64 {
    coin::value(coin)
}
