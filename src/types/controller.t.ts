interface IController {
  name: string;
  method: string;
  path: string;
  handlerName?: string;
  guards?: boolean;
}
