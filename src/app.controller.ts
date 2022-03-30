import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate')
  async generateFolder(@Body() data) {
    return await this.appService.generateFolder(data);
  }

  @Post('createProject')
  async createProject(@Body() data) {
    return await this.appService.createNestProject(data);
  }
}
