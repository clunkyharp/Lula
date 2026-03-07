import { InMemoryDb } from '../db/in-memory.db';
import { PetRecord } from '../common/types';
import { CreatePetDto } from './dto';
export declare class PetService {
    private readonly db;
    constructor(db: InMemoryDb);
    getOrCreate(userId: string, payload?: CreatePetDto): PetRecord;
    getByUser(userId: string): PetRecord;
    feed(userId: string): PetRecord;
    play(userId: string): PetRecord;
    heal(userId: string): PetRecord;
    applyXp(userId: string, xpDelta: number): PetRecord;
    degradeForNeglect(userId: string, amount: number): PetRecord;
    private update;
}
