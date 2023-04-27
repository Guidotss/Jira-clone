import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

@Module({
  controllers: [EntriesController],
  providers: [EntriesService],
  imports: [TypeOrmModule.forFeature([Entry])],
})
export class EntriesModule {}
