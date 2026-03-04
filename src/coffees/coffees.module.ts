import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.enitity';

@Module({
    providers: [CoffeesService],
    controllers: [CoffeesController],
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
})
export class CoffeesModule { }
