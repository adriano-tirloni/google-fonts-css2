import { ALPHABET_ORDER, AXIS_NAME_MAPPING } from "./constants.js";

// https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300&display=auto
// https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&family=Roboto+Mono:wght@300&family=Roboto+Mono:wght@200&display=auto
// These two URLs request the same file, but in the second we don't need to sort the tuples (100;200;300), only the axis names.
// Because of that, it requires less loops and processing to create the second URL, even tough it is lengthier.
// So this is the only strategy in this library for now.


// Tried to keep iterarion of arrays and objects to a minimum while maintaining code readability.

const createFullQuery = ({ family, styles }) => {
  const encodedFamilyName = family.replaceAll(" ", "+");

  let sortedStyles = styles.map((styleObject) => { 
    
    for (let key in styleObject) {
      let googleAxisKey = AXIS_NAME_MAPPING[key]
      if (!googleAxisKey) throw new Error(`The directive axis (${key}) is not on Google Fonts axis list (weight, wgth, ital...)`)
      if (googleAxisKey !== key) delete Object.assign(styleObject, {[googleAxisKey]: styleObject[key] })[key];      
    }

    return Object.entries(styleObject).sort((pair1, pair2) => sorter(pair1[0], pair2[0])) //Sort by axis alphabetically
  })
  let familyString = ""

  sortedStyles.forEach((styleAxis, i) => {
    familyString += (i === 0 ? '' : '&') + 'family=' + encodedFamilyName + ':'

    let axisString = ''
    let valuesString = ''

    styleAxis.forEach((axis, i) => {
      let separator = styleAxis.length === i+1 ? '' : ','
      axisString += axis[0] + separator
      valuesString += (Array.isArray(axis[1]) ?  axis[1].sort((a,b) => a-b).join('..') : axis[1])  + separator
    })

    familyString += axisString + '@' + valuesString
  })

  return familyString
}

let sorter = (str1, str2) => {
  if (str1 === str2) throw new Error(`Styles Object key are not unique: ${str1}`)

  // Sort by axis name
  let position = (ALPHABET_ORDER.indexOf(str1[0]) - ALPHABET_ORDER.indexOf(str2[0]))
  return position === 0 ? sorter(str1.substr(1), str2.substr(1)) : position
}

export default createFullQuery