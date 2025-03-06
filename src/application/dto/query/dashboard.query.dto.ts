import { DashboardEntity } from "src/domain/entity/dashboard.entity";
import { QueryOrderByCodes } from "src/domain/value-object";

class DashboardQuery {
  public readonly dashboardId?: number;
  public readonly title?: string;
  public readonly description?: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly page?: number;
  public readonly skip?: number;
  public readonly limit?: number;
  public readonly order?: string;

  constructor(
    dashboardId?: number,
    title?: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    page?: number,
    skip?: number,
    limit?: number,
    order?: string
  ) {
      this.dashboardId = dashboardId;
      this.title = title;
      this.description = description;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.page = page;
      this.skip = skip;
      this.limit = limit;
      this.order = order ?? `dashboardId.${QueryOrderByCodes.DESC}`;
  }
}

class DashboardQueryResult {
  dashboardId: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  
  static fromEntity(entity: DashboardEntity): DashboardQueryResult {
    return Object.assign(new DashboardQueryResult(), entity);
  }
  /*
    constructor(entity: DashboardEntity) {
      this.dashboardId = entity.dashboardId;
      this.title = entity.title;
      this.description = entity.description;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  */
}

export { 
  DashboardQuery,
  DashboardQueryResult
}