import { PetEmotion, PetRecord, PetStage } from '../common/types';
export declare function derivePetStage(xp: number, alive: boolean): PetStage;
export declare function deriveEmotion(pet: Pick<PetRecord, 'alive' | 'health' | 'happiness' | 'hunger' | 'energy'>): PetEmotion;
export declare function enforcePermanentDeath(pet: PetRecord): PetRecord;
