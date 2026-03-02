import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla']
        }
    ];

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: string) {
        const existingCoffee = this.coffees.find(coffee => coffee.id === +id);
        if (!existingCoffee) {
            throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return existingCoffee;
    }

    create(createCoffeeDto) {
        return this.coffees.push(createCoffeeDto)
    }

    update(id: string, updateCoffeeDto) {
        const existingCoffee = this.findOne(id);
        if (!existingCoffee) {
            throw new HttpException(`Coffee not ${id} found`, HttpStatus.NOT_FOUND);
        }
        Object.assign(existingCoffee, updateCoffeeDto);
        return existingCoffee;
    }

    remove(id: string) {
        this.coffees = this.coffees.filter(coffee => coffee.id !== +id);
    }


}
