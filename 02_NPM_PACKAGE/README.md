### Publishing Package to NPM

In this readme we are going to go through how we can publish our package using some tools. We are going to start with an empty package.json that contains the following fields

```ts
{
  "name": "hello-world",
  "license": "MIT"
}
```

Next we are going to create a `index.ts` file and add the following code in it.

```ts
export const add = (a: number, b: number) => a + b;
export const sub = (a: string, b: number) => a - b;
```

Next we are going to install `typescript` as a dev dependency. And we are then going to run

```shell
yarn add -D typescript
yarn tsc --init
```

Our `tsconfig.json` will look as follows:

```json
{
  "compilerOptions": {
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "commonjs" /* Specify what module code is generated. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */,
    "noEmit": true,
    "noUncheckedIndexedAccess": true
  }
}
```

The next thing that we are going to add is `tsup` which is the package that will buddle our typescript by turning the typescript files to javascript files as follows:

```shell
yarn add tsup --dev
```

And then we are going to add the `build` command that will look as follows in our package.json file:

```json
{
  "scripts": {
    "build": "tsup index.ts --format esm,cjs --dts",
    "lint": "tsc"
  }
}
```

> We have added the `"lint"` command so that it can check for typescript errors in our project. https://tsup.egoist.dev/#output-extension

Now we can run the following command to build the package:

```shell
yarn run build
```

Next we are going to specify the `main`, `types` and `module` properties in our package.json so that it will look as follows:

```json
{
  "name": "hello-world",
  "license": "MIT",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "devDependencies": {
    "tsup": "^8.0.1",
    "typescript": "^5.3.3"
  },
  "scripts": {
    "build": "tsup index.ts --format esm,cjs --dts",
    "lint": "tsc"
  }
}
```

Now we need to setup the versioning cli called [`changesets`](https://github.com/changesets/changesets/tree/main) for our package as follows:

```shell
yarn add @changesets/cli && yarn changeset init
```

The command `init` will add a `.changeset/config` and a `readme.md` file in your project folder.

### Refs

1. [tsup.egoist.dev](https://tsup.egoist.dev/#output-extension)
2. [github.com/changesets](https://github.com/changesets/changesets/tree/main)
