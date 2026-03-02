import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) { }

    async findAll() {
        return await this.coffeeRepository.find();
    }

    async findOne(id: string) {
        const existingCoffee = await this.coffeeRepository.findOne({ where: { id: +id } });
        if (!existingCoffee) {
            throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return existingCoffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = await this.coffeeRepository.create(createCoffeeDto);
        return await this.coffeeRepository.save(coffee)
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeeRepository.preload({
            id:+id,
            ...updateCoffeeDto
        })
        if(!coffee){
            throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return await this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const existingCoffee = await this.findOne(id);
        if (!existingCoffee) {
            throw new HttpException(`Coffee not ${id} found`, HttpStatus.NOT_FOUND);
        }
        return await this.coffeeRepository.remove(existingCoffee);
    }
}
