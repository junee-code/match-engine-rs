import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ConfigModule, 
	ConfigService 
} from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'mariadb', 
				replication: {
					master: {
						host: configService.get('MASTER_DB_HOST'),
						port: configService.get<number>('MASTER_DB_PORT'),
						username: configService.get('MASTER_DB_USERNAME'),
						password: configService.get('MASTER_DB_PASSWORD'),
						database: configService.get('MASTER_DB_DATABASE'),
					},
					slaves: [{
						host: configService.get('SLAVE_DB_HOST'),
						port: configService.get<number>('SLAVE_DB_PORT'),
						username: configService.get('SLAVE_DB_USERNAME'),
						password: configService.get('SLAVE_DB_PASSWORD'),
						database: configService.get('SLAVE_DB_DATABASE'),
					}],
				},
				entities: [__dirname + '/../../**/domain/entity/*.entity{.ts,.js}'],
				synchronize: false,
				timezone: 'Z',
				logging: true
			}),
		}),	
	],
})

export class DatabaseModule {}

