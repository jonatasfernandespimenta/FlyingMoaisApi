import { Injectable } from '@nestjs/common';
import { controllerTemplate } from './templates/controller.template';
import { moduleTemplate } from './templates/module.template';
const fs = require('fs');
const exec = require('child_process').exec

@Injectable()
export class AppService {
  createController(data: IData) {
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

  createModule(data: IData) {
    const fileName = `${data.name.toLowerCase()}.module.ts`;
    fs.writeFile(`./${data.name}/${fileName}`, moduleTemplate(data), (err) => {
      if (err) {
        console.log(err);
      }
    })

    return { success: true };
  }

  async generateFolder(data) {
    if(!fs.existsSync(data.name)) {
      fs.mkdirSync(`${data.name}`);
    }

    
    await this.createModule(data);
    await this.createController(data);
    exec(`move ${data.name} ${data.projectName}/src/`);
  }

  async createProject(data: IProject) {
    exec(`mkdir ${data.projectName}`)
    exec(`cd ${data.projectName} && nest new ${data.projectName} -p npm`);
    exec(`cd ${data.projectName}`);
    exec(`npm i`);
    exec(`npm i @nestjs/typeorm @nestjs/passport`);
  };
}
