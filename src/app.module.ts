import { Module } from '@nestjs/common';
import { SearchModule } from './search.module';

@Module({
  imports: [SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
