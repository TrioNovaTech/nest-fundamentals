import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    /*
    Services separate business logic from controllers: Controllers handle HTTP, while services handle business logic.
    Services are providers: They can be injected into other parts of the application.
    Providers can inject dependencies: Services can depend on other services, and Nest handles their instantiation automatically.
    Nest's runtime wires dependencies: The DI system automatically handles how objects (services) relate to each other,
    so you don't have to manually instantiate or configure them.
    */

    // we'll use this array of coffees as our database to read, update and delete items from
    // but first we'll create resource entitity for these items so that we know what type they are
    private coffees: Coffee[] = []

    findAll() {
        return this.coffees
    }

    findOne(id: string) {
        return this.coffees.find(item => item.id === +id)
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto)
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id)
        if (existingCoffee) {
            // update the existing entity
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id)
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1)
        }
    }
}
