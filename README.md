# 📜GOOGLE FONTS CSS 2
## A Javascript package to integrate with Google Fonts API.

⚠️ _**If you were using the v1 of this package check the new API below, it is slightly different.**_ ⚠️

- **Single purpose**: To provide an easy interface to create the latest version of a Google Fonts CSS2 URL.
- No dependencies.
- It adheres to the rules described on [the current Google Fonts Documentation (CSS2)](https://developers.google.com/fonts/docs/css2 "Google Fonts Documentation (CSS2)").
- Works on browser and server side (**SSR**).
- Can create **Material Symbols** and **Material Icons** URLs

Read on for more information. 
Feel free to open issues or PRs.

------------

##### How it works?
> **You say**: 
Gimme **Open Sans**, from **light to bold**, **italic**. **condensed** and **normal**!

> **It answers:**
[https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75,300..700&family=Open+Sans:ital,wdth,wght@1,100,300..700&display=auto](https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75,300..700&family=Open+Sans:ital,wdth,wght@1,100,300..700&display=auto)

------------

- **[Getting Started](#getting-started)**
	- **[NodeJS, Browser, Common-JS, ES-Modules](#nodejs-browser-common-js-es-modules)**
	- **[Functions](#functions)**
	- **Android, IOS & Flutter**
- **Google Fonts**
	- **Regular Fonts**
	- **Variable Fonts**
	- **Variable Fonts Options**
- **Google Material Symbols**
	- **Variable Symbols Options**
- **Google Material Icons**
- **[Validations](#input-validation)**
- **Examples**

---
## Getting Started
### NodeJS, Browser, Common-JS, ES-Modules

This package is bundled to be used in multiple environments (ESM, CJS, UMD).
Check the `/dist` folder for enviroment options.

### Install

```console
npm i google-fonts-css2
```
```console
yarn add google-fonts-css2
```
```html
<!-- directly in browser, note the /dist/umd path -->
<script src="https://cdn.jsdelivr.net/npm/google-fonts-css2@2.0.0/dist/umd/index.min.js"></script>
```

### Import
You can seamlessly `import` or `require`:

```javascript
import { getGoogleFontsUrl, getGoogleFontsUrlSimple } from "google-fonts-css2"
```
or
```javascript
const { getGoogleFontsUrl, getGoogleFontsUrlSimple } = require("google-fonts-css2")
```
or

`For HTML check the codepen:` [https://codepen.io/adrianotirloni/pen/ExEWbdd](https://codepen.io/adrianotirloni/pen/ExEWbdd)

### Functions
#### 📜 getGoogleFontsUrlSimple
This function calls getGoogleFontsUrl but with simpler argurments and reduced options.
- Arguments: Any number of strings or objects.
- Strings: Directive family style strings - All spaces and cases are removed from the string, except for the Font Family name.
- Objects: Directive family style objects or a options object.

Strings format: "`<case-sensitive-spaced font name>`,`<weights>`,`<?italic> or <?widths>`"
Objects
1) Options object: {display: <string>, onlyThisCharacters: <string>}
2) Font Style object: Same as getGoogleFontsUrl function (this allow full directive request).
	
##### Examples (open urls in browser to check it):
```javascript
//Open Sans - Named regular weight
getGoogleFontsUrlSimple('Open Sans, regular')
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=auto

//Open Sans - Named regular weight, with options object
getGoogleFontsUrlSimple(
  {display: "swap", onlyThisCharacters: "abcd"}, 
  "Open Sans, regular"
)
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap&text=abcd

//Multiple arguments, multiple fonts, unordered
getGoogleFontsUrlSimple("Open Sans, 300, italic", {display: "swap"}, "Lato, regular")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&family=Lato:wght@400&display=swap	
	
//Open Sans - Numbered regular weight
getGoogleFontsUrlSimple("Open Sans, 400")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=auto

//Open Sans - Multiple Named and Numbered weight
getGoogleFontsUrlSimple("Open Sans, regular & 600")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&family=Open+Sans:wght@600&display=auto

//Open Sans - Multiple Named weight
getGoogleFontsUrlSimple("Open Sans, regular & semibold & bold")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&family=Open+Sans:wght@600&family=Open+Sans:wght@700&display=auto

//Open Sans - Ranged weight
getGoogleFontsUrlSimple("Open Sans, 300..800")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=auto

//Open Sans - Regular Italic
getGoogleFontsUrlSimple("Open Sans, 400, italic")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,400&display=auto

//Open Sans - Full weight range, italic and named width
getGoogleFontsUrlSimple("Open Sans, 300..800, italic, condensed & normal")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75,300..800&family=Open+Sans:ital,wdth,wght@1,100,300..800&display=auto

//Open Sans - Full weight range, WITHOUT italic and named width
getGoogleFontsUrlSimple("Open Sans, 300..800, condensed & semiCondensed & normal")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:wdth,wght@75,300..800&family=Open+Sans:wdth,wght@87.5,300..800&family=Open+Sans:wdth,wght@100,300..800&display=auto

//Open Sans - Full weight range, with italic and full ranged width
getGoogleFontsUrlSimple("Open Sans, 300..800, 75..100, italic")
//=> https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75..100,300..800&display=auto
```

#### 📜 getGoogleFontsUrl
This function is the full base function to construct the urls.
	
- Arguments: An array of objects (Font Families), Display, OnlyThisCharacters
- Display: `'auto' | 'block' | 'swap' | 'fallback' | 'optional'`
- OnlyThisCharacters: Optional, string.
- Font Family Object:
	- family: Case sensitive font family name, as per Google Fonts website.
	- styles: Array of Font Styles Objects available to the chosen family.
	- Font Style Object:
		- Any number of directive pairs: `<axisDirective>: <axisOption>`
	
		- Axis Directive: `wght` (axis symbol) or `weight` (humanized name)
			- Examples: `ital` or `italic`, `XOPQ` or `thickStroke`
	
		- Axis Option: Number, String or Range
			- Range: `[Number, Number]` or `[String, Number]` or `[String, String]` or `"StrNumber..StrNumber"`
			- Number: Negative or positive with decimal places accordingly to selected Font
			- String: Number or Range representation as String.
	
![getGoogleFontsUrl picture](https://user-images.githubusercontent.com/6390605/179752075-46b4ba36-acb8-4904-bbc6-3c1f3fd8cd24.jpg)

```javascript
	
getGoogleFontsUrl([
  {
    family: 'Roboto Flex', 
    styles: [ 
      {weight: '100..1000', width: [25, 150], slant: -5, figureHeight: 500},
    ]
  },
  {
    family: 'Open Sans', 
    styles: [ 
      {weight: '400', italic: 1},
    ]
  }
], 'swap', 'abcdefgh')
	
getGoogleFontsUrl(
  [
    {
      family: 'Material Icons',
      styles: [
        { wght: '500', wght: '501' }
      ]
    }
  ],
  'swap'
)
      
getGoogleFontsUrl([
  {
    family: 'Roboto Flex',
    styles: [
      { weight: '100..500', width: [-10, 0] }
    ]
  }
], 'swap')
```

## Input Validation
- ✅ Validates the existence of the directive axis used. (`weight or wght`, `opticalSize or opsz`)
- ✅ Ignores duplicate directives (`wght`) and uses the latest one.
- ❌ Does **not** validate if the font requested has the directive in its options. Eg: If you request **Open Sans**, asking for `slant -10` the URL will properly be created **BUT** Google will return a `400` answer as the **slant** directive is not avaliable for **Open Sans**
