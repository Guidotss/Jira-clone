import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [EntriesController],
  providers: [EntriesService],
  imports: [TypeOrmModule.forFeature([Entry])],
})
export class EntriesModule {}
