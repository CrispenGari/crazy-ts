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

If you are getting an error saying:

```
"const stripAnsi = require("strip-ansi")
                  ^

Error [ERR_REQUIRE_ESM]: require() "
```

You will need to add `resolutions` in your package.json as follows:

```json
{ 
  "resolutions": {
    "strip-ansi": "6.0.1"
  }
}
```
And then rerun

```shell
yarn add @changesets/cli && yarn changeset init
```
The command `init` will add a `.changeset/config.json` and a `readme.md` file in your project folder. The `config.json` file looks as follows:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```
Then next we are going to run the following commmand:

```shell
yarn changeset
```
> And answer some questions related to your package.


Next we are going to add a github workflow by creating a file called `.github/workflows/main.yml`

```yml
name: CI
on:
  push:
    branches:
      - "**" # all branches

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Github Repository
        uses: actions/checkout@v4

      - name: Setup Nodejs and NPM
        uses: actions/setup-node@v4
        with:
          node-version: 18x

      - name: Install latest Yarn
        run: corepack prepare yarn@stable --activate

      - name: Activate latest Yarn
        run: yarn set version stable

      - name: Installing Packages using Yarn
        run: yarn

      - name: Linting and building
        run: yarn lint && yarn build
```



Next we are going to create the `workflow` for publishing our package. We are going to call that workflow `publish.yml` and we will add the following code to it:\

```yml
name: Publish Package
on:
  push:
    branches:
      - main
concurrency: ${{ github.workflow}}-${{github.ref}}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Github Repository
        uses: actions/checkout@v4

      - name: Setup Nodejs and NPM
        uses: actions/setup-node@v4
        with:
          node-version: 18x

      - name: Install latest Yarn
        run: corepack prepare yarn@stable --activate

      - name: Activate latest Yarn
        run: yarn set version stable

      - name: Installing Packages using Yarn
        run: yarn

      - name: Linting and building
        run: yarn lint && yarn build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          # This expects you to have a script called release which does a build for your packages and calls changeset publish
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Now if we can add and push our code to github our github actions should also runs.

### Refs

1. [tsup.egoist.dev](https://tsup.egoist.dev/#output-extension)
2. [github.com/changesets](https://github.com/changesets/changesets/tree/main)
3. [changesets/action](https://github.com/changesets/action)
4. [actions/checkout](https://github.com/actions/checkout)
5. [actions/setup-node](https://github.com/actions/setup-node)
