SHELL = /usr/bin/env bash -o pipefail

default: help

.PHONY: help
help:
	# Usage:
	@sed -n '/^\([a-z][^:]*\).*/s//    make \1/p' $(MAKEFILE_LIST)

.PHONY: frontend/install
frontend/install:
	cd web-components; \
	npm install

.PHONY: frontend/build
frontend/build:
	cd web-components; \
	npm run build

.PHONY: frontend/watch
frontend/watch:
	cd web-components; \
	npm run build:watch

.PHONY: frontend/test
frontend/test:
	cd web-components; \
	npm run test

.PHONY: run
run:
	cd negotiator; \
	poetry run python -m negotiator;

.PHONY: migrate
migrate:
	poetry run alembic upgrade head

.PHONY: migrate-test
migrate-test:
	DATABASE_URL='postgresql://localhost:5432/negotiator_test?user=negotiator&password=negotiator' poetry run alembic upgrade head

.PHONY: type-checks
type-checks:
	poetry run mypy negotiator tests;

.PHONY: test
test: type-checks
	poetry run python -m unittest;
