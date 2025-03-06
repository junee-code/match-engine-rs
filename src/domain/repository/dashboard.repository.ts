import { Injectable } from '@nestjs/common';
import { DashboardQuery, DashboardQueryResult } from 'src/application/dto/query';

@Injectable()
export abstract class DashboardRepository {
    abstract getDashboard(data: DashboardQuery): Promise<DashboardQueryResult[]>;
}