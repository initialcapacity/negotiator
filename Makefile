SHELL = /usr/bin/env bash -o pipefail

default: help

.PHONY: help
help:
	# Usage:
	@sed -n '/^\([a-z][^:]*\).*/s//    make \1/p' $(MAKEFILE_LIST)

.PHONY: web-components/install
web-components/install:
	cd web-components; \
	npm install

.PHONY: web-components/build
web-components/build:
	cd web-components; \
	npm run build

.PHONY: web-components/watch
web-components/watch:
	cd web-components; \
	npm run build:watch

.PHONY: web-components/test
web-components/test:
	cd web-components; \
	npm run test

.PHONY: negotiator/run
negotiator/run:
	cd negotiator; \
	poetry run python -m negotiator;

.PHONY: migrate
migrate:
	poetry run alembic upgrade head

.PHONY: migrate-test
migrate-test:
	DATABASE_URL='postgresql://localhost:5432/negotiator_test?user=negotiator&password=negotiator' poetry run alembic upgrade head

.PHONY: negotiator/type-checks
negotiator/type-checks:
	poetry run mypy negotiator tests;

.PHONY: negotiator/test
negotiator/test: negotiator/type-checks
	poetry run python -m unittest;

.PHONY: test
test: negotiator/test web-components/test
