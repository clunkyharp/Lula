import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreatePetDto } from './dto';
import { PetService } from './pet.service';

function extractUserId(headers: Record<string, string | string[] | undefined>): string {
  const userId = headers['x-user-id'];
  return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getPet(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.petService.getByUser(extractUserId(headers));
  }

  @Post('create')
  createPet(
    @Headers() headers: Record<string, string | string[] | undefined>,
    @Body() payload: CreatePetDto
  ) {
    return this.petService.getOrCreate(extractUserId(headers), payload);
  }

  @Post('feed')
  feed(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.petService.feed(extractUserId(headers));
  }

  @Post('play')
  play(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.petService.play(extractUserId(headers));
  }

  @Post('heal')
  heal(@Headers() headers: Record<string, string | string[] | undefined>) {
    return this.petService.heal(extractUserId(headers));
  }
}
