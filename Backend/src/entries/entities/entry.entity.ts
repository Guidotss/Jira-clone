import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type status = 'pending' | 'in-progress' | 'done';

@Entity({ name:'entries' })
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  status: status;
}
