export type EntryStaus = 'pending' | 'in-progress' | 'completed';

export interface Entry {
    id: string;
    title: string; 
    description?: string;
    status:EntryStaus; 
}