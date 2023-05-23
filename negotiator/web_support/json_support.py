import dataclasses
import json
import typing
from uuid import UUID


def encode(obj: typing.Any) -> str:
    return json.dumps(obj, cls=EncoderWithDataClassSupport)


class EncoderWithDataClassSupport(json.JSONEncoder):
    def default(self, o: typing.Any) -> typing.Any:
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        if type(o) is UUID:
            return str(o)

        return super().default(o)
