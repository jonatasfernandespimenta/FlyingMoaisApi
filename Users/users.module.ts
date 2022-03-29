
    import { Module } from '@nestjs/common';
    import { UsersService } from './Users.service';
    import { UsersController } from './Users.controller';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Users } from './Users.entity';
    import { AuthGuard } from '@nestjs/passport';
    import { JwtModule } from '@nestjs/jwt';
    import { ConfigModule } from '@nestjs/config';
    
    @Module({
      imports: [
        TypeOrmModule.forFeature([Users]),
        ,
      ],
      providers: [UsersService],
      controllers: [UsersController],
    })
    export class UsersModule {}
  