import { generateMethod } from "../utils/helpers";

export function controllerTemplate(data: IController) {
  const template = `
    import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
    import { ${data.name}Service } from './${data.name}.service';
    import { AuthGuard } from '@nestjs/passport';

    @Controller('${data.path}')
    export class ${data.name}Controller {
      constructor(private readonly ${data.name.toLowerCase()}Service: ${data.name}Service) {}

      ${generateMethod(data)}
      ${data.guards ? '@UseGuards(AuthGuard(\'jwt\'))' : ''}
      async ${data.handlerName}() {
        return await this.${data.name.toLowerCase()}Service.${data.handlerName}();
      }
    }
  `;
  
  return template;
}
