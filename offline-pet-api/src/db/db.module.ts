import { Global, Module } from '@nestjs/common';
import { InMemoryDb } from './in-memory.db';

@Global()
@Module({
  providers: [InMemoryDb],
  exports: [InMemoryDb]
})
export class DbModule {}
