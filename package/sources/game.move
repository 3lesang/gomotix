/*
/// Module: package
module package::package;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module package::gomotix;

use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin};
use sui::sui::SUI;

const EGameNotActive: u64 = 2;
const EGameFull: u64 = 4;
const EInsufficientStake: u64 = 5;

const PENDING: u8 = 0;
const ACTIVE: u8 = 1;
const X: u8 = 1;
const O: u8 = 2;

public struct Room has key, store {
    id: UID,
    host: address,
    player: address,
    stake: Balance<SUI>,
    status: u8,
    host_symbol: u8,
}

public entry fun create_room(stake: Coin<SUI>, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);
    let host_symbol = if (tx_context::epoch(ctx) % 2 == 0) { X } else { O };
    let game_room = Room {
        id: object::new(ctx),
        host: sender,
        player: @0x0,
        stake: coin::into_balance(stake),
        status: PENDING,
        host_symbol,
    };
    transfer::share_object(game_room);
}

public entry fun join_room(room: &mut Room, stake: Coin<SUI>, ctx: &mut TxContext) {
    let sender = tx_context::sender(ctx);
    assert!(room.status == PENDING, EGameNotActive);
    assert!(room.player == @0x0, EGameFull);
    assert!(coin::value(&stake) == balance::value(&room.stake), EInsufficientStake);

    room.player = sender;
    room.status = ACTIVE;
    balance::join(&mut room.stake, coin::into_balance(stake));
}
