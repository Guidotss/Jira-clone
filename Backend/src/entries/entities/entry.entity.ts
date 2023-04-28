import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';

export type EntryStatus = 'pending' | 'in-progress' | 'completed';

@Entity({name:'entries'})
export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type:'text',
        nullable:false
    })
    title: string;

    @Column({
        type:'text',
        nullable:true
    })
    description: string;

    @Column({
        type:'text',
        nullable:false
    })
    status: EntryStatus;

    @Column({
        type:'text',
        nullable:true
    })
    createdAt: string;
}
