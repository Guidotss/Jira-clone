import { Injectable, Logger,InternalServerErrorException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity'

@Injectable()
export class EntriesService {

  private logger = new Logger('EntriesService');

  constructor (
    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,
    private readonly dataSource: DataSource
  ) {}

  async create(createEntryDto: CreateEntryDto) {
    try{
      const date = new Date();
      const createdAt = date.toISOString().split('T')[0];
      const entry = this.entriesRepository.create({...createEntryDto,createdAt});
      return await this.entriesRepository.save(entry);
      
    }catch(error){
      this.handleErrors(error);
    }
  }

  async findAll() {
    return await this.entriesRepository.find();
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

  handleErrors(error: any){
    if(error.code === '23505')
      throw new InternalServerErrorException('Duplicate entry'); 
    else
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Unexpected error has occurred while processing your request, please check the server logs for more details');
  }
}
