"""add_order_to_messages

Revision ID: e579fd027a10
Revises: 7301d7922bd0
Create Date: 2023-07-16 19:10:55.726175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e579fd027a10'
down_revision = '7301d7922bd0'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("""
    create sequence message_order;
    alter table messages add column message_order int not null default nextval('message_order');
    """)
