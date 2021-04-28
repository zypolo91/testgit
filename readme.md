## 如何初始化一个开源级的typescript库
#### 1.初始化git仓库
    git init

#### 2.安装mrm及mrm任务
    npm i mrm mrm-task-gitignore mrm-task-typescript mrm-task-prettier mrm-task-eslint mrm-task-lint-staged -D()

#### 3.执行mrm任务
    npx mrm gitignore typescript prettier eslint lint-staged 

    gitignore任务 ->创建.gitignore
    typescript任务 ->安装typescript并创建tsconfig.json
    prettier任务 ->安装prettier创建.prettierrc
    eslint任务 ->安装eslint,eslint-config-prettier创建.eslintrc.json
    lint-staged任务 ->安装husky,lint-staged创建.husky/pre-commit hooks

#### 4.修改生成的配置文件 并安装eslint-plugin-prettier
    npm i eslint-plugin-prettier -D

* 修改tsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true,
        "strict": true,
        "esModuleInterop": true,
        "removeComments": true,
        "pretty": true,
        "lib": ["es6"],
        "declaration": true,
        "declarationDir": "./dist/types/"
    },
    "include": ["src"],
}
```
* 修改package.json 
```json
{
    ...
        "scripts": {
            "lint": "eslint --ext .js,.ts, ./src",
        }
        "lint-staged": {
        "*.{js,ts,tsx}": [
        "prettier --write ",
        "eslint --cache --fix",
        "git add"
        ]
    }
}
```
* 修改.eslintrc.json 
```json
{
    "parser": "@typescript-eslint/parser",
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-continue": "off",
        "no-mixed-operators": "off",
        "no-plusplus": "off",
        "no-nested-ternary": "off",
        "consistent-return": "off",
        "max-len": "off"
    }
}
```
* 修改.prettierrc
```json
{}
```
#### 5.安装commitlint,(用于校验git commit信息)
    npm i @commitlint/cli @commitlint/config-conventional -D 

#### 6.创建commitlint配置文件
    echo module.exports = {extends: ['@commitlint/config-conventional']} > commitlint.config.js

#### 7.生成commit-msg钩子
    npx husky add commit-msg

#### 8.在提交信息的时候用commitlint去校验msg
    echo npx --no-install commitlint --edit $1 >> .husky/commit-msg

#### 9.安装standard-version(用于生成changlog)
    npm i --save-dev standard-version

#### 10. 创建standard-version的配置文件
* 修改packgae.json
```json
{
    ...
    "scripts": {
        "release": "standard-version"
    }
}
```
* 创建.versionrc.json
```json
{
"header": "Changelog",
"skip": {
    "tag": true
},
"types": [
    { "type": "feat", "section": "新特性" },
    { "type": "fix", "section": "Bug修复" },
    { "type": "docs", "section": "文档" },
    { "type": "chore", "section": "配置项", "hidden": true },
    { "type": "style", "section": "格式", "hidden": true },
    { "type": "refactor", "section": "重构", "hidden": true },
    { "type": "perf", "section": "性能", "hidden": true },
    { "type": "test", "section": "测试", "hidden": true },
    { "type": "build", "section": "构建", "hidden": true },
    { "type": "ci", "section": "CI", "hidden": true },
    { "type": "revert", "section": "回滚", "hidden": true }
],
"releaseCommitMessageFormat": "chore(release): v{{currentTag}}版本发布"
}
```

#### 11.安装测试依赖
    npm i jest ts-jest @types/jest -D
    
#### 12.创建测试配置文件
* 修改packgae.json
```json
{
    ...
    "scripts": {
        "test": "jest"
    }
}
```
* 创建jest.config.js
```js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>/test/'],
    testURL: 'http://localhost/',
    globals: {
        'ts-jest': {
        tsconfig: 'tsconfig.json',
        isolatedModules: true,
        },
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/test/helpers/'],
    coverageDirectory: './coverage/',
    collectCoverage: true,
};
```
#### 13.安装打包工具依赖
    npm i rollup rollup-plugin-terser rollup-plugin-typescript2 rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-delete -D

#### 14.创建打包配置文件
* 修改package.json 
```json 
{
    ...
    "name": "ts-git-lib",
    "version": "0.0.1",
    "author": "polozy",
    "description": "this is a ts git lib",
    "license": "MIT",
    "main": "dist/index.js",
    "module": "dist/index.esm.js",
    "files": [
        "src",
        "dist"
    ],
    "types": "dist/types/index.d.ts",
    "sideEffects": false,
    ...
    "scripts": {
        "build": "rollup -c ./rollup.config.js",
    }
}
```
      
* 修改.gitignore
```
...
.tmp
dist/
coverage/
```
    
* 创建rollup.config.js
```js
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const banner = `/* @preserve
* gcoord ${pkg.version}, ${pkg.description}
* Copyright (c) ${new Date().getFullYear()} zypolo
*/
`;

export default {
input: 'src/index.ts',
output: [
    {
    file: pkg.main,
    format: 'umd',
    name: pkg.name,
    banner,
    sourcemap: true,
    exports: 'default',
    plugins: [terser()],
    },
    {
    file: pkg.module,
    format: 'es',
    banner,
    exports: 'default',
    sourcemap: true,
    },
],
plugins: [
    typescript({
    cacheRoot: './.tmp/.rpt2_cache',
    useTsconfigDeclarationDir: true,
    }),
],
};
```


--- 可选 ---
#### 安装commitizen使用git cz格式化提交消息
    npm install -g commitizen

    commitizen init cz-conventional-changelog --save-dev --save-exact

    git cz 替换 git commit -m "xxxx"

#### 文档支持
* 新建docs目录

* 在docs创建README.md
```md
---
home: true
actionText: 开始使用 →
actionLink: /readme
footer: MIT Licensed | Copyright © 2020-present polo
features:
- title: 快速
details: 快速创建库
- title: TypeScript
details: TypeScript 支持
---
ts-git-template

[vuepress官网](https://www.vuepress.cn/)

[markdown基本教程](https://www.runoob.com/markdown/md-tutorial.html)

```

* npm i --save-dev vuepress

* 在package.json加入
```json
"scripts": {
    ...
    "docs": "vuepress dev docs",
    "docs:build": "vuepress build docs && cp -rf ./docs/.vuepress/dist/* ./docs && rm -r ./docs/.vuepress/dist"
}
```
* 运行npm run docs

#### 文档上传自动显示Github Page
![Github Page](https://zebra-common-system-pre.oss-cn-shanghai.aliyuncs.com/bmdev/6391f365-c15c-4cce-b833-9e1116111a72.png
)