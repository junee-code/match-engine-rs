import { Module } from '@nestjs/common';
import { 
  ConfigModule, 
  ConfigService 
} from '@nestjs/config';
import { DashboardModule } from './module/dashboard/dashboard.module';
import { DatabaseModule } from './config/database';

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: `.env.${process.env.NODE_ENV}`,
        isGlobal: true
      }),
      DatabaseModule,
      DashboardModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule  {
  constructor(
    private readonly configService: ConfigService
  ) {}
}
