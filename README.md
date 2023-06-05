# Negotiator

## Build and run

1.  Install dependencies
    ```shell
    brew install pyenv poetry nodejs postgresql@14
    poetry install
    make frontend/install
    ```

1.  Set up the database
    ```shell
    psql postgres < databases/drop_and_create_databases.sql
    make migrate migrate-test
    ```

1.  Build the frontend
    ```shell
    make frontend/build
    ```

1.  Run the app
    ```shell
    cp .env.example .env
    vi .env
    source .env
    make run
    ```
