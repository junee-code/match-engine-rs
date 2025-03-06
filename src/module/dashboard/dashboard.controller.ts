import { 
    Controller, 
    Get, 
    Query
} from '@nestjs/common';
import { DefaultResponseDto } from 'src/application/dto/common';
import { AnnouncementCredentialsDto } from 'src/application/dto/credential';
import { DashboardHandler } from 'src/application/use-case';

@Controller('/api/v1/dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardHandler: DashboardHandler
    ) {}
    
    @Get('/announcement')
    async announcement(
        @Query() query: AnnouncementCredentialsDto
    ): Promise<DefaultResponseDto> {   
        return await this.dashboardHandler.getDashboard(query)
    }
}
