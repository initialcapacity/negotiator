import os

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

config = context.config
config.set_main_option('sqlalchemy.url', os.environ['DATABASE_URL'])

connectable = engine_from_config(
    config.get_section(config.config_ini_section, {}),
    prefix="sqlalchemy.",
    poolclass=pool.NullPool,
)

with connectable.connect() as connection:
    context.configure(
        connection=connection, target_metadata=None
    )

    with context.begin_transaction():
        context.run_migrations()
