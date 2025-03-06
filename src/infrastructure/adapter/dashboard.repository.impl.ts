import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TABLE_NAMES } from 'src/domain/value-object';
import { DashboardEntity } from '../../domain/entity/dashboard.entity';
import { DashboardQuery, DashboardQueryResult } from 'src/application/dto/query';
import { DashboardRepository } from 'src/domain/repository';
import { DashboardManyMapper } from 'src/domain/mapper';
import { setQueryBuilderCondition, queryBuilderConditions } from 'src/common/helper';

@Injectable()
export class DashboardRepositoryImpl implements DashboardRepository {
  private readonly tableName: string;
  constructor(
    @InjectRepository(DashboardEntity)
    private readonly dashboardRepository: Repository<DashboardEntity>,
  ) {
    this.tableName = TABLE_NAMES.DASHBOARD; 
  }

  public async getDashboard(data: DashboardQuery): Promise<DashboardQueryResult[]> {
    const query = this.dashboardRepository.createQueryBuilder(this.tableName);
    const queryConditions = setQueryBuilderCondition<DashboardQuery>(data);
    const getDashboardQuery = queryBuilderConditions(query, queryConditions, this.tableName);
    const getDashboardQueryResult = await getDashboardQuery.getMany();
    const mapper = new DashboardManyMapper();
    return mapper.toDomains(getDashboardQueryResult);
  }
}