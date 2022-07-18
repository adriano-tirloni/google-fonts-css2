import { WEIGHT_NAME_MAPPING, WIDTH_NAME_MAPPING } from "./constants.js";
import { getGoogleFontsUrl } from "./getGoogleFontsUrl.js"

/**
 * 
 * @param  {string | object} directives
 * Can receive any number of **directive strings or objects**, and an **options object**
 * 👇 (check examples below)
 * #### Options Object:
 * ```{display: 'string', onlyThisCharacters: 'string}```
 * *display: 'auto' (default) | 'block' | 'swap' | 'fallback' | 'optional'*
 * *onlyThisCharacters: optional or a string of characters*
 * #### String Directive:
 * A formatted string that will be parsed into most common styles: weight, italic, width.
 * Font Name is required, and case sensitive.
 * Weight is required.
 * Italic and Width are optional.
 * Follow this pattern:
 * ```Font Name,weight&weight,[italic,][width&width]```
 * 
 * Examples:
 * ```Roboto Flex,bold,```
 */
export const getGoogleFontsUrlSimple = (...directives) => {
  let stdParam = {families: [], display: undefined, onlyThisCharacters: undefined}

  directives.forEach(arg => {
    if (arg.display || arg.onlyThisCharacters){
      //Options object
      stdParam.display = arg.display
      stdParam.onlyThisCharacters = arg.onlyThisCharacters
    } else if (typeof arg === 'string') {
      //Shortcut String "FontNameCaseSensitive,weight_Named_Number_Range&weight_Named_Number_Range,[italic,width_Named_Number_Range];"
      //Examples:
      //Lato,300&400,italic,25..50
      //Lato,bold&semibold,italic,condensed&normal&125..150
      //Lato,bold&semibold,condensed&normal&125..150
      //Lato,bold&thin

      let familyName = arg.slice(0, arg.indexOf(","))
      let others = arg.slice(arg.indexOf(",")+1).toLowerCase().replaceAll(" ", "")
      let [weights, ...italicAndWidthArray] = others.split(",")

      let italicIndex = italicAndWidthArray ? italicAndWidthArray.indexOf("italic") : -1
      let italic = italicIndex >= 0
      let widths = italicAndWidthArray.length ? italicAndWidthArray[italicIndex === 0 ? 1 : 0] : null

      let familyStyles = {
        family: familyName,
        styles: []
      }

      weights.split("&").forEach(weight => {
        weight = sanitizeW(weight, WEIGHT_NAME_MAPPING)

        if (widths){
          widths.split("&").forEach(width => {
            width = sanitizeW(width,  WIDTH_NAME_MAPPING)
  
            let style = { weight, width }
            if(italic) style.italic = 1;
            familyStyles.styles.push(style)
            
          })
        } else {
          let style =  { weight }
          if(italic) style.italic = 1;
          familyStyles.styles.push(style)

        }

      })

      stdParam.families.push(familyStyles)
    } else if (typeof arg === 'object') {
      stdParam.families.push(arg)
    }
  })

  return getGoogleFontsUrl(stdParam.families, stdParam.display, stdParam.onlyThisCharacters)
}

function sanitizeW(weight_or_width, MAPPING) {
  if (weight_or_width.includes("..")) {
    //Range
    return weight_or_width.split("..").map(n => Number(n))
  } else if (isNaN(Number(weight_or_width))) {
    //Named
    let mapped = MAPPING[weight_or_width]
    if(!mapped) throw new Error(`Invalid name for weight or width: ${weight_or_width}. You may have misplaced the argument order or separator.`)
    return MAPPING[weight_or_width]
  } else if (typeof Number(weight_or_width) === "number") {
    //Number as string or not
    return Number(weight_or_width)      
  } else {
    throw new Error("Could not convert font weight or width.")
  }
}