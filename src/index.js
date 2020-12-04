import createCommonQuery from "./createCommonQuery";

const assembleCommon = families => 'https://fonts.googleapis.com/css2?' + families.map(familyStyles => createCommonQuery(familyStyles)).join('')
const assembleFull = () => { throw 'Not yet developed'}

export { assembleFull }
export { assembleCommon }
