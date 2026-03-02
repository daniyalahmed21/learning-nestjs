import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

@Module({
    providers: [CoffeesService],
    controllers: [CoffeesController],
    imports: [TypeOrmModule.forFeature([Coffee])],
})
export class CoffeesModule { }
