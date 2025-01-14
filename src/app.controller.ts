import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// controllers handles specific requests to the application
@Controller()
export class AppController {
  // we can see that it uses the app service provider
  // to help separating business logic from the controller itself
  constructor(private readonly appService: AppService) {}

  // this get request uses a method from appservice called getHello
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
