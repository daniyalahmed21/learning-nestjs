import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ) { }

    async findAll() {
        return await this.coffeeRepository.find({
            relations: ['flavors']
        });
    }

    async findOne(id: string) {
        const existingCoffee = await this.coffeeRepository.findOne({ where: { id: +id }, relations: ['flavors'] });
        if (!existingCoffee) {
            throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return existingCoffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const coffee = await this.coffeeRepository.create({ ...createCoffeeDto, flavors });
        return await this.coffeeRepository.save(coffee)
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        })
        if (!coffee) {
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

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        return await this.flavorRepository.save({ name });
    }
}
