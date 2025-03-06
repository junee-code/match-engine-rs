import { DashboardDomain } from "../model";
import { DashboardEntity } from "../entity";

class DashboardMapper {
  toDomain(entity: DashboardEntity): DashboardDomain {
    return new DashboardDomain(
      entity.dashboardId,
      entity.title,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  toEntity(domain: DashboardDomain): DashboardEntity {
    const entity = new DashboardEntity();
    entity.dashboardId = domain.dashboardId;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}

class DashboardManyMapper {
  toDomains(entities: DashboardEntity[]): DashboardDomain[] {
    return entities.map(entity => this.toDomain(entity));
  }

  toEntities(domains: DashboardDomain[]): DashboardEntity[] {
    return domains.map(domain => this.toEntity(domain));
  }

  private toDomain(entity: DashboardEntity): DashboardDomain {
    const mapper = new DashboardMapper();
    return mapper.toDomain(entity);
  }

  private toEntity(domain: DashboardDomain): DashboardEntity {
    const mapper = new DashboardMapper();   
    return mapper.toEntity(domain);
  }
}

export { DashboardMapper, DashboardManyMapper };