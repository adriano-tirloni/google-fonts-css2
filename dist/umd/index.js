// google-fonts-css2 v2.0.2 Copyright (c) 2022 Adriano Tirloni
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GoogleFontsCSS2 = {}));
})(this, (function (exports) { 'use strict';

  const GOOGLE_FONT_API_URI = 'https://fonts.googleapis.com/css2?';

  const AXIS_NAME_MAPPING = {
      italic: 'ital',
      opticalSize: 'opsz',
      slant: 'slnt',
      weight: 'wght',
      width: 'wdth',
      ascenderHeight: 'YTAS',
      casual: 'CASL',
      counterWidth: 'XTRA',
      cursive: 'CRSV',
      descenderDepth: 'YTDE',
      figureHeight: 'YTFI',
      fill: 'FILL',
      grade: 'GRAD',
      lowercaseHeight: 'YTLC',
      monospace: 'MONO',
      softness: 'SOFT',
      thickStroke: 'XOPQ',
      thinStroke: 'YOPQ',
      uppercaseHeight: 'YTUC',
      wonky: 'WONK',
      ital: 'ital',
      opsz: 'opsz',
      slnt: 'slnt',
      wght: 'wght',
      wdth: 'wdth',
      YTAS: 'YTAS',
      CASL: 'CASL',
      XTRA: 'XTRA',
      CRSV: 'CRSV',
      YTDE: 'YTDE',
      YTFI: 'YTFI',
      FILL: 'FILL',
      GRAD: 'GRAD',
      YTLC: 'YTLC',
      MONO: 'MONO',
      SOFT: 'SOFT',
      XOPQ: 'XOPQ',
      YOPQ: 'YOPQ',
      YTUC: 'YTUC',
      WONK: 'WONK'
  };

  const ALPHABET_ORDER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const WEIGHT_NAME_MAPPING = {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    };
    
  const WIDTH_NAME_MAPPING = {
      supercondensed: 25,
      ultracondensed: 50,
      extracondensed: 62.5,
      condensed: 75,
      semicondensed: 87.5,
      normal: 100,
      semiexpanded: 112.5,
      expanded: 125,
      extraexpanded: 150,
    };

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
        let googleAxisKey = AXIS_NAME_MAPPING[key];
        if (!googleAxisKey) throw new Error(`The directive axis (${key}) is not on Google Fonts axis list (weight, wgth, ital...)`)
        if (googleAxisKey !== key) delete Object.assign(styleObject, {[googleAxisKey]: styleObject[key] })[key];      
      }

      return Object.entries(styleObject).sort((pair1, pair2) => sorter(pair1[0], pair2[0])) //Sort by axis alphabetically
    });
    let familyString = "";

    sortedStyles.forEach((styleAxis, i) => {
      familyString += (i === 0 ? '' : '&') + 'family=' + encodedFamilyName + ':';

      let axisString = '';
      let valuesString = '';

      styleAxis.forEach((axis, i) => {
        let separator = styleAxis.length === i+1 ? '' : ',';
        axisString += axis[0] + separator;
        valuesString += (Array.isArray(axis[1]) ?  axis[1].sort((a,b) => a-b).join('..') : axis[1])  + separator;
      });

      familyString += axisString + '@' + valuesString;
    });

    return familyString
  };

  let sorter = (str1, str2) => {
    if (str1 === str2) throw new Error(`Styles Object key are not unique: ${str1}`)

    // Sort by axis name
    let position = (ALPHABET_ORDER.indexOf(str1[0]) - ALPHABET_ORDER.indexOf(str2[0]));
    return position === 0 ? sorter(str1.substr(1), str2.substr(1)) : position
  };

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
  const getGoogleFontsUrl = (families, display='auto', onlyThisCharacters) => {
      return GOOGLE_FONT_API_URI + createFamilies(families) + createDisplay(display) + createText(onlyThisCharacters)
    };

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
  const getGoogleFontsUrlSimple = (...directives) => {
    let stdParam = {families: [], display: undefined, onlyThisCharacters: undefined};

    directives.forEach(arg => {
      if (arg.display || arg.onlyThisCharacters){
        //Options object
        stdParam.display = arg.display;
        stdParam.onlyThisCharacters = arg.onlyThisCharacters;
      } else if (typeof arg === 'string') {
        //Shortcut String "FontNameCaseSensitive,weight_Named_Number_Range&weight_Named_Number_Range,[italic,width_Named_Number_Range];"
        //Examples:
        //Lato,300&400,italic,25..50
        //Lato,bold&semibold,italic,condensed&normal&125..150
        //Lato,bold&semibold,condensed&normal&125..150
        //Lato,bold&thin

        let familyName = arg.slice(0, arg.indexOf(","));
        let others = arg.slice(arg.indexOf(",")+1).toLowerCase().replaceAll(" ", "");
        let [weights, ...italicAndWidthArray] = others.split(",");

        let italicIndex = italicAndWidthArray ? italicAndWidthArray.indexOf("italic") : -1;
        let italic = italicIndex >= 0;
        let widths = italicAndWidthArray.length ? italicAndWidthArray[italicIndex === 0 ? 1 : 0] : null;

        let familyStyles = {
          family: familyName,
          styles: []
        };

        weights.split("&").forEach(weight => {
          weight = sanitizeW(weight, WEIGHT_NAME_MAPPING);

          if (widths){
            widths.split("&").forEach(width => {
              width = sanitizeW(width,  WIDTH_NAME_MAPPING);
    
              let style = { weight, width };
              if(italic) style.italic = 1;
              familyStyles.styles.push(style);
              
            });
          } else {
            let style =  { weight };
            if(italic) style.italic = 1;
            familyStyles.styles.push(style);

          }

        });

        stdParam.families.push(familyStyles);
      } else if (typeof arg === 'object') {
        stdParam.families.push(arg);
      }
    });

    return getGoogleFontsUrl(stdParam.families, stdParam.display, stdParam.onlyThisCharacters)
  };

  function sanitizeW(weight_or_width, MAPPING) {
    if (weight_or_width.includes("..")) {
      //Range
      return weight_or_width.split("..").map(n => Number(n))
    } else if (isNaN(Number(weight_or_width))) {
      //Named
      let mapped = MAPPING[weight_or_width];
      if(!mapped) throw new Error(`Invalid name for weight or width: ${weight_or_width}. You may have misplaced the argument order or separator.`)
      return MAPPING[weight_or_width]
    } else if (typeof Number(weight_or_width) === "number") {
      //Number as string or not
      return Number(weight_or_width)      
    } else {
      throw new Error("Could not convert font weight or width.")
    }
  }

  exports.getGoogleFontsUrl = getGoogleFontsUrl;
  exports.getGoogleFontsUrlSimple = getGoogleFontsUrlSimple;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
