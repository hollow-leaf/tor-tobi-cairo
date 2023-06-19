install:
	git submodule init && git submodule update 
	cd ./cairo && git checkout v1.1.0
	cd ./cairo && cargo build --release