export function moduleTemplate(data: IData) {
  const template = `
    import { Module } from '@nestjs/common';
    import { ${data.name}Service } from './${data.name}.service';
    import { ${data.name}Controller } from './${data.name}.controller';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { ${data.name} } from './${data.name}.entity';
    import { AuthModule } from '../auth/auth.module';
    import { AuthService } from '../auth/auth.service';
    import { AuthGuard } from '@nestjs/passport';
    import { JwtModule } from '@nestjs/jwt';
    import { ConfigModule } from '@nestjs/config';
    import { config } from '../config/config';
    
    @Module({
      imports: [
        TypeOrmModule.forFeature([${data.name}]),
        AuthModule,
        ${
          data.usesJwt
            ? `JwtModule.register({
          secret: ${data.jwtConfig.secret},
          signOptions: { expiresIn: ${data.jwtConfig.expiresIn} },
        })`
            : ''
        },
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      providers: [${data.name}Service],
      controllers: [${data.name}Controller],
    })
    export class ${data.name}Module {}
  `;

  return template;
}
