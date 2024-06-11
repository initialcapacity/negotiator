SHELL = /usr/bin/env bash -o pipefail

default: help

.PHONY: help
help:
	# Usage:
	@sed -n '/^\([a-z][^:]*\).*/s//    make \1/p' $(MAKEFILE_LIST)

.PHONY: web-components/install
web-components/install:
	npm install --prefix web-components

.PHONY: web-components/build
web-components/build:
	npm run build --prefix web-components

.PHONY: web-components/watch
web-components/watch:
	npm run build:watch --prefix web-components

.PHONY: web-components/test
web-components/test:
	npm run test --prefix web-components

.PHONY: negotiator/run
negotiator/run:
	source venv/bin/activate && python -m negotiator;

.PHONY: migrate
migrate:
	source venv/bin/activate && alembic upgrade head

.PHONY: migrate-test
migrate-test:
	source venv/bin/activate && DATABASE_URL='postgresql://localhost:5432/negotiator_test?user=negotiator&password=negotiator' alembic upgrade head

.PHONY: negotiator/type-checks
negotiator/type-checks:
	source venv/bin/activate && mypy negotiator tests;

.PHONY: negotiator/test
negotiator/test: negotiator/type-checks
	source venv/bin/activate && python -m unittest;

.PHONY: test
test: negotiator/test web-components/test
