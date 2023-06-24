// SPDX-License-Identifier: MIT

%lang starknet
%builtins pedersen
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2

// Computes the Pedersen hash chain on an array of size `length` starting from `data_ptr`.
func hash_chain{hash_ptr: HashBuiltin*}(data_ptr: felt*, length: felt) -> (result: felt) {
    if (length == 2) {
        let (result) = hash2(x=[data_ptr], y=[data_ptr + 1]);
        return (result=result);
    } else {
        // Fix here:
        return (result=123456);
    }
}

func main{pedersen_ptr: HashBuiltin*}(path: felt*) {
    alloc_locals;
    // Allocate a new array.
    let (local data_ptr: felt*) = alloc();
    // Fill the new array with field elements.
    assert [data_ptr] = 314;
    assert [data_ptr + 1] = 159;
    // Run the hash chain.
    let (result) = hash_chain{hash_ptr=pedersen_ptr}(data_ptr=data_ptr, length=2);
    // Check the result.
    assert result = 307958720726328212653290369969069617958360335228383070119367204176047090109;

    // Fill two more cells in the array.
    assert [data_ptr + 2] = 265;
    assert [data_ptr + 3] = 358;
    // Compute the hash chain on all four cells.
    let (result) = hash_chain{hash_ptr=pedersen_ptr}(data_ptr=data_ptr, length=4);
    assert result = 1828757374677754028678056220799392919487521050857166686061558043629802016816;
    return ();
}
