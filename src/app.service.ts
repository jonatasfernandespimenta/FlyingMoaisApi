import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { controllerTemplate } from './templates/controller.template';
import { moduleTemplate } from './templates/module.template';
const fs = require('fs');
const exec = require('child_process').exec

@Injectable()
export class AppService {
  importNewModule(data: IData) {
    const mainModuleLocation = join(__dirname, '..', '..', data.projectName, data.projectName.toLowerCase(), 'src', 'app.module.ts');
    let mainModule = fs.readFileSync(`${mainModuleLocation}`, 'utf8');

    const imports = `import { ${data.name}Module } from './${data.name}/${data.name.toLowerCase()}.module';`;
    const importsArray = mainModule.split('\n').filter(line => line.includes('imports: ['));
    const newModuleName = `${data.name}Module`;
    
    mainModule = imports + '\n' + mainModule

    fs.writeFileSync(mainModuleLocation, mainModule);

    if(importsArray.length === 0) {
      const newImports = `imports: [
        ${newModuleName}
      ]`;
      const newMainModule = mainModule.replace('imports: []', newImports);
      fs.writeFileSync(mainModuleLocation, newMainModule);
    } else {
      const newImports = importsArray[0].replace(']', `,
        ${newModuleName}
      ]`);
      const newMainModule = mainModule.replace(importsArray[0], newImports);
      fs.writeFileSync(mainModuleLocation, newMainModule);
    }
  }

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

    exec(`move ${data.name} ${data.projectName}/${data.projectName.toLowerCase()}/src/`);
    
    await this.createController(data);
    await this.createModule(data);
    await this.importNewModule(data);
  }

  async createNestProject(data: IProject) {
    exec(`mkdir ${data.projectName}`)
    exec(`cd ${data.projectName} && nest new ${data.projectName} -p npm`);
    exec(`cd ${data.projectName}`);
    exec(`npm i`);
    exec(`npm i @nestjs/typeorm @nestjs/passport`);
  };
}
