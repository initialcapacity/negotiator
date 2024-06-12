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

1.  Install python and dependencies
    ```shell
    brew install python@3.12 nodejs postgresql@14
    python -m venv venv
    pip install -r requirements.txt
    npm install --prefix web-components
    ```

1.  Set up the environment
    ```shell
    cp .env.example .env
    vi .env
    source .env
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

1.  Run the fake oauth server in a separate terminal
    ```shell
    python fake_auth_server.py
    ```

1.  Run the app in a separate terminal
    ```shell
    source .env
    python -m negotiator
    ```

### Running tests

```shell
poetry run mypy negotiator tests
poetry run python -m unittest
npm run test --prefix web-components
```

### Running with Docker

1. Install dependencies and run via gunicorn
    ```shell 
   pip install -r requirements.txt
    ```

    ```shell  
   gunicorn -w 4 'negotiator.app:create_app()' --bind=0.0.0.0:${PORT}
    ```
   
1. Pack and run via docker
    ```shell 
   pack build negotiator --builder=gcr.io/buildpacks/builder:v1
    ```

    ```shell
   docker run -p 8081:8081 --env-file .env.docker negotiator
    ```   
