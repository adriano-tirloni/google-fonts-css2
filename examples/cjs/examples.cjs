const { getGoogleFontsUrl, getGoogleFontsUrlSimple } = require("../../dist/cjs/index.js")

printThisExample(
  "Material Icons",
  getGoogleFontsUrl([
      {family: 'Material Icons', styles: [ {wght: '500', wght: '501'} ]}
    ], 'swap')
)

printThisExample(
  "Open Sans wrong directive",
  getGoogleFontsUrl([
      {family: 'Open Sans', styles: [ { slant: '-10' } ]}
    ])
)

printThisExample(
  "Complex Variable Font",
  getGoogleFontsUrl([
      {
        family: 'Roboto Flex', 
        styles: [ 
          {weight: '100..500', width: [-10, 0]} 
        ]}
    ], 'swap')
)






function printThisExample(title, response){
  try {
    console.log(`EXAMPLE: ${title} => ${response}`)
  } catch (error) {
    console.log(`EXAMPLE: ${title} => ${error}`)
  }
}