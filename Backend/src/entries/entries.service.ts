import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {
  private logger = new Logger('EntriesService');

  constructor(
    @InjectRepository(Entry)
    private readonly entriesRepository: Repository<Entry>,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createEntryDto: CreateEntryDto) {
    try {
      const date = new Date();
      const createdAt = date.toISOString().split('T')[0];
      const entry = this.entriesRepository.create({
        ...createEntryDto,
        createdAt,
      });
      return await this.entriesRepository.save(entry);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async findAll() {
    return await this.entriesRepository.find();
  }

  public async findOne(id: string) {
    try {
      const entry = await this.entriesRepository.findOneBy({ id });
      if (!entry) throw new InternalServerErrorException('Entry not found');
      return entry;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async update(id: string, updateEntryDto: UpdateEntryDto) {
    try {
      const date = new Date();
      const updatedAt = date.toISOString().split('T')[0];
      const entry = await this.entriesRepository.preload({
        ...updateEntryDto,
        id,
        updatedAt,
      });

      if (!entry)
        throw new InternalServerErrorException(`Entry with id ${id} not found`);

      return await this.entriesRepository.save(entry);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async remove(id: string) {
    const entry = await this.findOne(id);

    try {
      const result = await this.entriesRepository.delete(entry);
      if (result.affected === 0)
        throw new InternalServerErrorException(`Entry with id ${id} not found`);
      return result;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any) {
    if (error.code === '23505')
      throw new InternalServerErrorException('Duplicate entry');
    else this.logger.error(error.message, error.stack);
    throw new InternalServerErrorException(
      'Unexpected error has occurred while processing your request, please check the server logs for more details',
    );
  }
}
