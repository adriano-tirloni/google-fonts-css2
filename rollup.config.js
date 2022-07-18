//Plugins 
import { terser } from "rollup-plugin-terser";

//Consts
const isProduction = process.env.NODE_ENV === 'production'
const outputFileName = 'index'
const outputFile = isProduction ? "./dist/prod.js" : "./dist/dev.js";
const name = 'GoogleFontsCSS2'

//Other
import pack from "./package.json";
const banner = `// ${pack.name} v${pack.version} Copyright (c) ${new Date().getFullYear()} ${pack.author}`;

//Remove dist folder if it exists, so building is clean.
import fs from "fs";
if (fs.existsSync("./dist") && fs.readdirSync("./dist").length){
  fs.rmSync("./dist", {recursive: true, force: true});
}

const exportConfig = ({ minify, config }) => {

  return {
    input: './src/index.js',
    ...config,
    output: {     
      ...config.output,
      file: `${config.output.file}${minify ? '.min.js' : '.js'}`,
      banner,
    },
    plugins: [
      minify && terser()
    ]
  }
}

export default [
  exportConfig({ 
    minify: false, 
    config: {
      output: {
        file: `./dist/esm/${outputFileName}`,
        format: 'esm',
        exports: 'named',
        preferConst: true,
      }
    }}),
  exportConfig({ 
    minify: true, 
    config: {
      output: {
        file: `./dist/esm/${outputFileName}`,
        format: 'esm',
        exports: 'named',
        preferConst: true,
      }
    }}),
    exportConfig({ 
      minify: false, 
      config: {
        output: {
          file: `./dist/umd/${outputFileName}`,
          format: 'umd',
          name
        },
      }}),
  // {
  //   // ES5
  //   input: './src/main.js',
  //   plugins: [
  //     getBabelOutputPlugin({
  //       presets: ['@babel/preset-env']
  //     })
  //   ],
  //   output: {
  //     file: './build/bundle-es5.js',
  //     format: 'cjs',
  //     name
  //   }
  // }
];


// export default {
//   input: 'src/index.js',
//   output: [
//     {
//       file: outputFile,
//       format: 'cjs',
//       exports: 'named',
//       sourcemap: true,
//       strict: false
//     }
//   ],
//   plugins: [
//     replace({
//       "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
//     }),
//     babel({
//       exclude: "node_modules/**",
//       presets: ["@babel/preset-env"],
//     })
//   ],
//   external: []
// }