# Negotiator

An app that helps you to practice negotiations with ChatGPT.

## Architecture

Negotiator is a server side rendered app using [Flask](https://flask.palletsprojects.com/).
It uses [Lit](https://lit.dev/) to create [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
to add dynamic capabilities to each page.
Lit web components are developed and tested in the [web components](./web-components) directory, and build Javascript
and CSS artifacts are copied to the Flask app's [static](./negotiator/static) directory.
This approach allows for the simplicity of server side rendered app with the dynamic features of a single page app.

## Build and run

1.  Install dependencies
    ```shell
    brew install pyenv poetry nodejs postgresql@14
    poetry install
    npm install --prefix web-components
    ```

1.  Set up the database
    ```shell
    psql postgres < databases/drop_and_create_databases.sql
    make migrate migrate-test
    ```

1.  Build the frontend and watch for changes
    ```shell
    npm run build:watch --prefix web-components
    ```

1.  Run the app in a separate terminal
    ```shell
    cp .env.example .env
    vi .env
    source .env
    poetry run python -m negotiator
    ```

## Test

```shell
poetry run mypy negotiator tests
poetry run python -m unittest
npm run test --prefix web-components
```
