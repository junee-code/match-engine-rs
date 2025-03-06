import { Injectable } from "@nestjs/common";
import { DashboardQuery } from "src/application/dto/query";
import { DefaultResponseDto } from "src/application/dto/common";
import { CustomStatusCodes } from "src/domain/value-object/commom.vo";
import { DashboardUseCase } from "src/application/use-case";
import { DashboardRepository } from "src/domain/repository";

@Injectable()
export class DashboardUseCaseImpl implements DashboardUseCase {
  constructor(
    private dashboardRepository: DashboardRepository,
  ){}

  public async getDashboard(command: DashboardQuery): Promise<DefaultResponseDto> {
    const getDashboardResults = await this.dashboardRepository.getDashboard(command);
    return new DefaultResponseDto(CustomStatusCodes.SUCCESS, getDashboardResults);
  }
}