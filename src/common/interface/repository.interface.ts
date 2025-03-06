import { FindManyOptions } from 'typeorm';
import { QueryOrderByCodes } from 'src/domain/value-object/commom.vo';

/**
 * IRepository<Entity, UniqueType>
 *
 * @template T - Entity 타입
 * @template V - Unique identifier 타입
 */
export interface IRepository<T, V> {
  /**
   * 엔티티를 생성합니다.
   * @param {T} t - 생성할 엔티티
   * @returns {Promise<T>} 생성된 엔티티
   */
  create(t: T): Promise<T>;

  /**
   * 엔티티를 업데이트합니다.
   * @param {T} t - 업데이트할 엔티티
   * @returns {Promise<void>}
   */
  update(t: T): Promise<void>;

  /**
   * 고유 식별자로 엔티티를 찾습니다.
   * @param {V} v - 고유 식별자
   * @returns {Promise<T | undefined>} 찾은 Entity 또는 undefined
   */
  find(v: V): Promise<T | undefined>;

  /**
   * 조건에 맞는 모든 엔티티를 찾습니다.
   * @param {IFindCondition} conditions - 검색 조건
   * @returns {Promise<T[]>} 찾은 Entity 배열
   */
  findAll(conditions: IFindCondition<T>): Promise<T[]>;
}

/**
 * IFindCondition
 *
 * 검색 조건을 정의하는 인터페이스
 */
export interface IFindCondition<T> extends Omit<FindManyOptions<T>, 'order' > {
  where?: Record<string, any>;
  page?: number;
  order?: string;
  limit?: number;
}

/**
 * IQueryBuilderCondition
 *
 * QueryBuilder를 사용하여 검색 조건을 정의하는 인터페이스
 */
export interface IQueryBuilderCondition<T> extends Omit<IFindCondition<T>, 'order' | 'select'> {
  select?: string[];
  leftJoinAndSelect?: string[];
  order?: Record<string, QueryOrderByCodes>;
  groupBy?: string;
  limit?: number;
}
