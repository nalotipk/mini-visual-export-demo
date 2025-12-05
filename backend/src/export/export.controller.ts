import { Body, Controller, Post, Res } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('zip')
  async exportZip(@Body() body: any, @Res() res: any) {
    return this.exportService.generateProjectZip(body.components || [], res);
  }
}
