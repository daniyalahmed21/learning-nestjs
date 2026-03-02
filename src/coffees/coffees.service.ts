import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees :Coffee [] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate','vanilla']
        }
    ];

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: string) {
        return this.coffees.find(coffee => coffee.id === +id);
    }

    create(createCoffeeDto) {
       this.coffees.push(createCoffeeDto)
    }

    update(id: string, updateCoffeeDto) {
        const existingCoffee = this.findOne(id);
        if (!existingCoffee) {
            throw new Error('Coffee not found');
        }
        Object.assign(existingCoffee, updateCoffeeDto);
        return existingCoffee;
    }

    remove(id: string) {
        this.coffees = this.coffees.filter(coffee => coffee.id !== +id);
    }

    
}
