import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  sendReminder(userId: string, message: string) {
    this.logger.log(`Notify ${userId}: ${message}`);
  }
}
