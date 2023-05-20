SHELL = /usr/bin/env bash -o pipefail

default: help

.PHONY: help
help:
	# Usage:
	@sed -n '/^\([a-z][^:]*\).*/s//    make \1/p' $(MAKEFILE_LIST)

.PHONY: run
run:
	cd negotiator; \
	poetry run python -m negotiator;

.PHONY: type-checks
type-checks:
	poetry run mypy negotiator tests;

.PHONY: test
test: type-checks
	poetry run python -m unittest;
