import { Body, Controller, Headers, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionEndDto, SessionStartDto, SessionTickDto } from './dto';

function extractUserId(headers: Record<string, string | string[] | undefined>): string {
  const userId = headers['x-user-id'];
  return Array.isArray(userId) ? userId[0] : userId ?? 'demo-user';
}

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start')
  start(
    @Headers() headers: Record<string, string | string[] | undefined>,
    @Body() payload: SessionStartDto
  ) {
    return this.sessionService.start(extractUserId(headers), payload);
  }

  @Post('tick')
  tick(
    @Headers() headers: Record<string, string | string[] | undefined>,
    @Body() payload: SessionTickDto
  ) {
    return this.sessionService.tick(extractUserId(headers), payload);
  }

  @Post('end')
  end(
    @Headers() headers: Record<string, string | string[] | undefined>,
    @Body() payload: SessionEndDto
  ) {
    return this.sessionService.end(extractUserId(headers), payload);
  }
}
