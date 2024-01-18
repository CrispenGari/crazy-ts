function log(
  originalMethod: (...args: any[]) => any,
  _context: ClassMethodDecoratorContext
) {
  return async function method(this: any, ...args: any[]) {
    console.log(
      `${_context.name.toString()} called with ${JSON.stringify(args)}`
    );
    const res = await originalMethod(this, ...args);
    console.log(`${_context.name.toString()} finished`);
    return res;
  };
}

class SDK {
  @log
  public async getUser(id: number) {
    return Promise.resolve({ id });
  }
  @log
  public async getPost(id: number) {
    return Promise.resolve({ id });
  }
}

const sdk = new SDK();
sdk.getPost(4);
