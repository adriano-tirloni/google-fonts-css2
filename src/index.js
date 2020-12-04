import createCommonQuery from "./createCommonQuery";

const assembleCommon = (families, display) => 'https://fonts.googleapis.com/css2?' + 
  families.map(familyStyles => createCommonQuery(familyStyles)).join('') + 
  'display=' + (display || 'auto')

const assembleFull = () => { throw 'Not yet developed'}

export { assembleFull }
export { assembleCommon }
