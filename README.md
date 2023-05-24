# Negotiator

## Build and run

1.  Install dependencies
    ```shell
    brew install pyenv poetry nodejs
    poetry install
    make frontend/install
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
