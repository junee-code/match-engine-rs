import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardHandler, DashboardUseCase } from 'src/application/use-case';
import { DashboardUseCaseImpl } from 'src/infrastructure/implementation';
import { DashboardRepository } from 'src/domain/repository';
import { DashboardRepositoryImpl } from 'src/infrastructure/adapter';
import { DashboardEntity } from 'src/domain/entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DashboardEntity]),
    ],
    providers: [
        DashboardHandler,
        { provide: DashboardUseCase, useClass: DashboardUseCaseImpl },
        { provide: DashboardRepository, useClass: DashboardRepositoryImpl },
    ],
    exports: [ 
        DashboardHandler,
        DashboardUseCase,
        DashboardRepository,
    ],
    controllers: [DashboardController],
})
export class DashboardModule {}
