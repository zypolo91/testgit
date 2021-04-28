import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";

const banner = `/* @preserve
 * gcoord ${pkg.version}, ${pkg.description}
 * Copyright (c) ${new Date().getFullYear()}polozy 
 */
`;

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: pkg.name,
      banner,
      sourcemap: true,
      exports: "default",
      plugins: [terser()],
    },
    {
      file: pkg.module,
      format: "es",
      banner,
      exports: "default",
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: "dist/*" }),
    resolve(),
    commonjs(),
    typescript({
      cacheRoot: "./.tmp/.rpt2_cache",
      useTsconfigDeclarationDir: true,
    }),
  ],
};
