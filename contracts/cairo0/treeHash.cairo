%lang starknet

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.hash import hash2

@storage_var
func root() -> (res: felt) {
}

@external
func tree{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}(x: felt, y: felt) -> (res: felt){
    // Run the hash chain.
    let (result) = hash2{hash_ptr=pedersen_ptr}(x = x, y = y);
    root.write(result);
    return (res = result);
}

@view
func get_root{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}() -> (res: felt){
    let (res) = root.read();
    return (res = res);
}
