import { Injectable } from "@nestjs/common";
import { DefaultResponseDto } from "../dto/common";
import { DashboardQuery } from "../dto/query";
import { DashboardUseCase } from "./dashboard.use-case";
import { filterValidQueryFields } from "src/common/helper/typeorm.helper";

@Injectable()
export class DashboardHandler {
  constructor(
    private readonly dashboardUseCase: DashboardUseCase
  ) {}

  async getDashboard(command: DashboardQuery): Promise<DefaultResponseDto>{
    let getDashboardArgs = filterValidQueryFields(command, new DashboardQuery());
    if (command.title) {
      getDashboardArgs = { ...getDashboardArgs, title: command.title };
    }
    return this.dashboardUseCase.getDashboard(getDashboardArgs);
  }
}