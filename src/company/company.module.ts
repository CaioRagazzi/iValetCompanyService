import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.provider';
import { CompanyService } from './company.service';

@Module({
  imports: [DatabaseModule],
  providers: [...companyProviders, CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
