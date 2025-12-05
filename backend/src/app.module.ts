import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportModule } from './export/export.module';

@Module({
  imports: [ExportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
