"""create_negotiations_and_messages

Revision ID: 7301d7922bd0
Revises: 
Create Date: 2023-06-05 07:47:28.173646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7301d7922bd0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("""
    create table negotiations (
        id         uuid default gen_random_uuid() not null primary key,
        created_at timestamp not null default now()
    );
    
    create table messages (
        id             uuid default gen_random_uuid() not null primary key,
        negotiation_id uuid references negotiations(id),
        role           text not null,
        content        text not null,
        created_at     timestamp not null default now()
    );
    """)
