import { IsString,MinLength,IsOptional,IsIn } from "class-validator";
import { EntryStatus } from "../entities/entry.entity";

export class CreateEntryDto {
    @IsString()
    @MinLength(3)
    title: string; 

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsIn(['pending','in-progress','completed'])
    status: EntryStatus;

    @IsString()
    @IsOptional()
    createdAt?: string;

}
