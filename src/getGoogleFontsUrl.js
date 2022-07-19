import { GOOGLE_FONT_API_URI } from "./constants.js";
import createFullQuery from "./createFullQuery.js";

/**
 * @typedef {object} Style
 * @property {string} weight - weight of the font
 */
/**
 * @typedef {object} familyStyle
 * @property {string} family - The family name.
 * @property {Style[]} styles - array of styles.
 */
/**
 * @param {familyStyle[]} families 
 * - Required. 
 * - Array of families, and the styles to request.
 * 
 * **Example:**
 * ```[{family: 'Lato', styles: [{weight: 600}]}]```
 * For a complete explanation visit: https://github.com/adriano-tirloni/google-fonts-css2
 * 
 * **Detailed Description:**
 * **families:**
 * 
 * ```[familyStyle, [familyStyle...]]```
 * 
 * **familyStyle:**
 * 
 * ```{ family: "Roboto Flex", styles: [style, [...style]]}```
 * 
 * **style:**
 * 
 * ```{ weight: 300, italic: 1, width: [25, 100]}```
 * 
 * @param {'auto' | 'block' | 'swap' | 'fallback' | 'optional'} [display=auto] 
 * - Optional. Defaults to ```auto```. 
 * - Display strategy (https://www.w3.org/TR/css-fonts-4/#font-display-desc)
 * @param {string} [onlyThisCharacters] 
 * - Optional.
 * - Creates the Google Fonts text parameter to request only included characters:
 * 
 * ### Optimizing your font requests
 * Oftentimes, when you want to use a web font on your site or application, you know in advance which letters you'll need. This often occurs when you're using a web font in a logo or heading.
 * 
 * In these cases, you should consider specifying a ```text=``` value in your font request URL. This allows Google Fonts to return a font file that's optimized for your request. In some cases, this can reduce the size of the font file by up to 90%.
 * 
 * https://developers.google.com/fonts/docs/css2#optimizing_your_font_requests
 * @returns {string} - A Google Font CSS2 string (https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,400&family=Roboto:wght@400&display=swap)
 */
export const getGoogleFontsUrl = (families, display='auto', onlyThisCharacters) => {
    return GOOGLE_FONT_API_URI + createFamilies(families) + createDisplay(display) + createText(onlyThisCharacters)
  }

function createFamilies(families){
return families.reduce((prev, familyStyles, i) => ( prev + (i?"&":"") + createFullQuery(familyStyles) ), "")
}

function createDisplay(display = 'auto') {
return '&display=' + display
}

function createText(text = null) {
if (!text) return "" 
return '&text=' + encodeURIComponent(text)
}