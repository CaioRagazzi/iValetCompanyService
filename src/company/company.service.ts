
import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyInsertDto } from './dto/company-insert.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async create(company: CompanyInsertDto): Promise<InsertResult> {

    const companyInst = new Company();
    companyInst.name = company.name;

    return this.companyRepository.insert(companyInst);
  }

  async findOneById(companyId: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });

    if (!company) {
      throw new Error('Company does not exists!');
    }

    return company;
  }

  async deleteById(companyId: number): Promise<DeleteResult> {
    const companyToDelete = await this.findOneById(companyId);

    if (!companyToDelete) {
      throw new Error('Company does not exists!');
    }

    const deleteResult = await this.companyRepository.delete(companyId);

    return deleteResult;
  }
}