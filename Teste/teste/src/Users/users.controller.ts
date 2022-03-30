
    import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
    import { UsersService } from './Users.service';
    import { AuthGuard } from '@nestjs/passport';

    @Controller('/')
    export class UsersController {
      constructor(private readonly usersService: UsersService) {}

      @Get()
      
      async getAll() {
        return await this.usersService.getAll();
      }
    }
  