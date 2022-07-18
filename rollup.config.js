//Plugins 
import { terser } from "rollup-plugin-terser";

//Consts
const outputFileName = 'index'
const name = 'GoogleFontsCSS2'

//Other
import pack from "./package.json";
const banner = `// ${pack.name} v${pack.version} Copyright (c) ${new Date().getFullYear()} ${pack.author}`;

//Remove dist folder if it exists, so building is clean.
import fs from "fs";
if (fs.existsSync("./dist") && fs.readdirSync("./dist").length){
  fs.rmSync("./dist", {recursive: true, force: true});
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
    }
  }),
  exportConfig({ 
    minify: true, 
    config: {
      output: {
        file: `./dist/esm/${outputFileName}`,
        format: 'esm',
        exports: 'named',
        preferConst: true,
      }
    }
  }),
    exportConfig({ 
      minify: false, 
      config: {
        output: {
          file: `./dist/umd/${outputFileName}`,
          format: 'umd',
          name
        },
    }
  })
];


function exportConfig ({ minify, config }) {

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