import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';
import { declare } from '../../dist/entries/entries.module';

@Injectable()
export class EntriesService {

  private readonly logger = new Logger('EntriesService');

  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    private readonly dataSource: DataSource, 
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    try{
      const entry = this.entryRepository.create(createEntryDto);
      await this.entryRepository.save(entry);
      return entry;
    }catch(error){
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all entries`;
  }

  findOne(id: string) {
    return `This action returns a #${id} entry`;
  }

  update(id: string, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: string) {
    return `This action removes a #${id} entry`;
  }

  handleException(error: any){
    if(error.code === '23505')
      throw new InternalServerErrorException(error.detail);
    
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');    
  }
}
