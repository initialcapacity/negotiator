from typing import TypeVar, Callable, Optional, List, cast

from sqlalchemy import CursorResult, Row, RowMapping

T = TypeVar('T')


def map_one_result(result: CursorResult, mapping: Callable[[RowMapping], T]) -> Optional[T]:
    if cast(int, result.rowcount) > 1:
        raise Exception(f'Expected one result but got {result.rowcount}')

    for row in result:
        return mapping(row._mapping)

    return None


def map_results(result: CursorResult, mapping: Callable[[RowMapping], T]) -> List[T]:
    return [mapping(row._mapping) for row in result]
