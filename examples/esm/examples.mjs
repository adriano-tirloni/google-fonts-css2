import { getGoogleFontsUrl, getGoogleFontsUrlSimple } from "../../dist/esm/index.js"

printThisExample(
  "Open Sans - Named regular weight",
  getGoogleFontsUrlSimple("Open Sans, regular") 
)

printThisExample(
  "Open Sans - Named regular weight, with otpions object",
  getGoogleFontsUrlSimple(
    {display: "swap", onlyThisCharacters: "abcd"}, 
    "Open Sans, regular"
  ) 
)

printThisExample(
  "Open Sans - Numbered regular weight",
  getGoogleFontsUrlSimple("Open Sans, 400")
)

printThisExample(
  "Open Sans - Multiple Named and Numbered weight",
  getGoogleFontsUrlSimple("Open Sans, regular & 600")
)

printThisExample(
  "Open Sans - Multiple Named weight",
  getGoogleFontsUrlSimple("Open Sans, 400 & semibold & bold")
)

printThisExample(
  "Open Sans - Ranged weight",
  getGoogleFontsUrlSimple("Open Sans, 300..800")
)

printThisExample(
  "Open Sans - Regular Italic",
  getGoogleFontsUrlSimple("Open Sans, 400, italic")
)

printThisExample(
  "Open Sans - Full weight range, italic and named width",
  getGoogleFontsUrlSimple("Open Sans, 300..800, condensed & normal")
)

printThisExample(
  "Open Sans - Full weight range, with italic and full ranged width",
  getGoogleFontsUrlSimple("Open Sans, 300..800, 75..100, italic")
)

printThisExample(
  "Multiple arguments, multiple fonts, unordered",
  getGoogleFontsUrlSimple("Open Sans, 300, italic", {display: "swap"}, "Lato, regular")
)

printThisExample(
  "Complex Variable Font",
  getGoogleFontsUrl([
    {
      family: 'Roboto Flex', 
      styles: [ 
        {weight: '800..1000', width: [25, 150], slant: -5, figureHeight: 500},
        {weight: 300},
        {weight: 400},
      ]
    },
    {
      family: 'Open Sans', 
      styles: [ 
        {weight: '400', italic: 1},
      ]
    }
  ], 'swap', 'abcdefgh')
)


function printThisExample(title, response){
  try {
    console.log(`EXAMPLE: ${title} => ${response}`)
  } catch (error) {
    console.log(`EXAMPLE: ${title} => ${error}`)
  }
}

