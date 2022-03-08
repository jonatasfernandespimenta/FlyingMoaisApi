export function generateMethod(data: IController) {
  switch (data.method) {
    case 'get':
      return '@Get()';
    
    case 'post':
      return '@Post()';

    case 'put':
      return '@Put()';
    
    case 'delete':
      return '@Delete()';

    default:
      break;
  }
}
