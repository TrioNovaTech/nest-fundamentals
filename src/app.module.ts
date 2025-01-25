import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';

// decorators are some functions that apply logic , they can apply to classes (like here), methods, properties and parameters.
// nestjs utilize decorators extensively. 
// with this decorator we have encapsulated everything needed for this module context.
@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
