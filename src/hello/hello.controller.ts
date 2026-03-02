import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    @Get(':name')
    sayHello(@Param('name') name: string){
        return 'Hello ' + name;
    }

    @Post()
    sayHelloPost(@Body() body){
        return body;
    }

    @Get()
    sayHelloQuery(@Query() paginationQuery){
        const {limit, offset} = paginationQuery;
        return `limit: ${limit}, offset: ${offset}`;
    }
}
