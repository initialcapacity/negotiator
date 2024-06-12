#!/usr/bin/env bash

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
npm install --prefix web-components

PGPASSWORD=postgres psql -h localhost postgres -U postgres < databases/drop_and_create_databases.sql
alembic upgrade head
DATABASE_URL="postgresql://localhost:5432/negotiator_test?user=negotiator&password=negotiator" alembic upgrade head

pushd web-components || exit
npm run build
npx playwright install-deps chromium
npx playwright install chromium
popd || exit