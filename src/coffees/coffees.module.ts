import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

// the module decorator takes a single object with properties that describes the module and all of it context
// they contain for main things : controllers, imports, exports, providers
// controllers: api routes that we want this module to instantiate
// exports: listing providers within this current module that should be available anywhere in this module
// imports: listing other modules that this module requires
// providers: listing services that need to be instantiated by the nest injector
// any provider here will be only available within this module itself unless it is added to exports
@Module({
    controllers: [CoffeesController],
    providers: [CoffeesService]
})
export class CoffeesModule {}
