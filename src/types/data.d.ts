interface IData {
  projectName: string;
  name: string;
  controllers: IController[];
  usesJwt: boolean;
  jwtConfig?: IJwtConfig;
}

interface IProject {
  projectName: string;
}
