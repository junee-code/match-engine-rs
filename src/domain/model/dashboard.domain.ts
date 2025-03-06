class DashboardDomain {
  public readonly dashboardId: number;
  public title: string;
  public description?: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    dashboardId: number,
    title: string,
    description: string | undefined,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.dashboardId = dashboardId;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { DashboardDomain };