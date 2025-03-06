import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from '../dto/common';
import { DashboardQuery } from '../dto/query';

@Injectable()
export abstract class DashboardUseCase { 
  abstract getDashboard(command: DashboardQuery): Promise<DefaultResponseDto>
}