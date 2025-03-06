import { FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { BaseListRequestDto } from 'src/application/dto/base';
import { QueryOrderByCodes } from 'src/domain/value-object';
import { IQueryBuilderCondition } from '../interface/repository.interface';

/**
 * 페이지네이션을 위한 오프셋을 계산합니다.
 * @param {BaseListRequestDto} param - 페이지네이션 정보가 포함된 객체
 * @returns {number} 계산된 오프셋
 */
export function getOffset(param: BaseListRequestDto): number {
  return (param.page - 1) * param.limit;
}

/**
 * DTO에서 유효한 필드만 필터링하는 함수
 * @template T - DTO 타입
 * @param {Partial<Record<string, any>>} data - 필터링할 데이터
 * @param {T} dtoInstance - 기준이 될 DTO 인스턴스
 * @returns {Partial<T>} - 유효한 필드만 포함된 데이터
 */
export function filterValidQueryFields<T>(data: Partial<Record<string, any>>, dtoInstance: T): Partial<T> {
  const validFields = Object.keys(dtoInstance); // DTO의 필드 목록
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => validFields.includes(key) && data[key] !== undefined)
  ) as Partial<T>;
}

/**
 * QueryBuilder 검색 조건을 설정합니다.
 * @template T - 조건 타입
 * @param {BaseListRequestDto} param - 검색 조건이 포함된 객체
 * @returns {IQueryBuilderCondition<T>} 설정된 검색 조건
 */
export function setQueryBuilderCondition<T>(param: BaseListRequestDto): IQueryBuilderCondition<T> {
  const { page = 1, limit = 10, order, ...condition } = param;
  const offset = { page, limit };

  // undefined 또는 빈 값이 포함된 키 제거
  const filteredCondition = Object.fromEntries(
    Object.entries(condition).filter(([_, value]) => value !== undefined && value !== null)
  );

  // where이 빈 객체 `{}`이면 undefined로 처리하여 SQL에서 `WHERE`을 아예 추가하지 않음
  const whereCondition = Object.keys(filteredCondition).length > 0 ? filteredCondition as FindOptionsWhere<T> : undefined;

  const listCondition: IQueryBuilderCondition<T> = {
    where: whereCondition,  // 중첩되는 `where: {}` 제거
    skip: getOffset(offset), // where 내부가 아니라 따로 설정
    limit: limit,
  };

  // order 변환
  if (order) {
    const [column, sort] = order.split('.');
    let sortOrder: QueryOrderByCodes = QueryOrderByCodes.DESC;
    if (sort && sort.toUpperCase() === QueryOrderByCodes.ASC) {
      sortOrder = QueryOrderByCodes.ASC;
    }
    listCondition.order = { [column]: sortOrder };
  }

  return listCondition;
}

/**
 * QueryBuilder에 조건을 적용합니다.
 * @template T - 조건 타입
 * @param {SelectQueryBuilder<T>} queryBuilder - QueryBuilder 객체
 * @param {IQueryBuilderCondition<T>} conditions - 적용할 검색 조건
 * @returns {SelectQueryBuilder<T>} 업데이트된 QueryBuilder
 */
export function queryBuilderConditions<T>(
  queryBuilder: SelectQueryBuilder<T>,
  conditions: IQueryBuilderCondition<T>,
  alias: string
): SelectQueryBuilder<T> {

  if (conditions.select) {
    queryBuilder.select(conditions.select.map(field => `${alias}.${field}`));
  }

  // where 조건이 있을 때만 적용 (빈 객체 `{}`일 경우 생략)
  if (conditions.where && Object.keys(conditions.where).length > 0) {
    Object.entries(conditions.where).forEach(([key, value], index) => {
      if (value !== undefined) {
        if (index === 0) {
          queryBuilder.where(`${alias}.${key} = :${key}`, { [key]: value });
        } else {
          queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
        }
      }
    });
  }

  // order 적용
  if (conditions.order && Object.keys(conditions.order).length > 0) {
    Object.entries(conditions.order).forEach(([column, direction]) => {
      queryBuilder.addOrderBy(`${alias}.${column}`, direction as QueryOrderByCodes);
    });
  }

  // groupBy 적용
  if (conditions.groupBy) {
    queryBuilder.groupBy(`${alias}.${conditions.groupBy}`);
  }

  // limit 적용
  if (conditions.limit && conditions.limit > 0) {
    queryBuilder.limit(conditions.limit);
  }

  // skip (offset) 적용 (0도 정상적으로 처리)
  if (conditions.skip !== undefined && conditions.skip >= 0) {
    queryBuilder.offset(conditions.skip);
  }

  return queryBuilder;
}