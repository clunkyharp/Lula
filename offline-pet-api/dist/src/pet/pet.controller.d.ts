import { CreatePetDto } from './dto';
import { PetService } from './pet.service';
export declare class PetController {
    private readonly petService;
    constructor(petService: PetService);
    getPet(headers: Record<string, string | string[] | undefined>): import("../common/types").PetRecord;
    createPet(headers: Record<string, string | string[] | undefined>, payload: CreatePetDto): import("../common/types").PetRecord;
    feed(headers: Record<string, string | string[] | undefined>): import("../common/types").PetRecord;
    play(headers: Record<string, string | string[] | undefined>): import("../common/types").PetRecord;
    heal(headers: Record<string, string | string[] | undefined>): import("../common/types").PetRecord;
}
