import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from "rollup-plugin-replace";
import babel from 'rollup-plugin-babel';

const NODE_ENV = process.env.NODE_ENV || "development";
const outputFile = NODE_ENV === "production" ? "./dist/prod.js" : "./dist/dev.js";

export default {
  input: 'src/index.js',
  output: [
    {
      file: outputFile,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-proposal-class-properties"]
    }),
    resolve(),
    commonjs()
  ],
  external: ['ajv']
}