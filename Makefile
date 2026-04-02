.PHONY: submodules-init submodules-update lint native-test native-smoke

submodules-init:
	git submodule update --init --recursive

submodules-update:
	git submodule update --remote --recursive

lint:
	npm run lint

native-test:
	cargo test --manifest-path xenor-native/Cargo.toml

native-smoke:
	cargo run --manifest-path xenor-native/Cargo.toml --bin xenor-cli -- --seed 17 --snapshot
