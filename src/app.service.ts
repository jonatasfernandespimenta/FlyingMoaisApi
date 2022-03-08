import { Injectable } from '@nestjs/common';
import { controllerTemplate } from './templates/controller.template';
const fs = require('fs');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createController(data) {
    const fileName = `${data.name.toLowerCase()}.controller.ts`;

    data.controllers.forEach((controller: IController) => {
      fs.writeFile(`./${data.name}/${fileName}`, controllerTemplate(controller), (err) => {
        if (err) {
          console.log(err);
        }
      })

      return { success: true };
    })
  }

  async generateProject(data) {
    if(!fs.existsSync(data.name)) {
      fs.mkdirSync(`${data.name}`);
    }

    await this.createController(data);
  }
}
