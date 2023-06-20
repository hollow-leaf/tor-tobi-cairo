#[contract]
mod Contract {
    struct Storage {
        root: felt252,
    }

    #[constructor]
    fn constructor(initial_root: felt252) {
        root::write(initial_root);
    }

    #[external]
    fn change_root(root: felt252) {
        root::write(root);
    }

    #[view]
    fn get_root() -> felt252 {
        root::read()
    }
}
