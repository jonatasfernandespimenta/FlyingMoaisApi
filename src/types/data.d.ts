interface IData {
  name: string;
  controllers: IController[];
  usesJwt: boolean;
  jwtConfig?: IJwtConfig;
}
