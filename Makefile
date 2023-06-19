install:
	git submodule init && git submodule update 
	cd ./cairo && git checkout v1.1.0
	cd ./cairo && cargo build --release

network:
	docker run -p 5050:5050 shardlabs/starknet-devnet:0.5.0a1 --seed 42

madara:
	docker-compose -f chain/madara/infra/docker/docker-compose.yml up -d