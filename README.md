# Google Fonts CSS2

This package is supposed to be an agnostic and fast helper package to interact with Google Fonts API version  2.

### URL Builder:

URL Builder for V2 has 2 functions:
`assembleCommom` - working 
`assembleFull` - to be developed as needed

**`assembleCommon`**: This function works as described below, and will request fonts with styles varying on **weight** and being **italic**. It was developed to fast, not to include all possible scenarios. For that there is the `assembleFull` function.

**`assembleFull`**: [not developed] - This function will take a different structure from assembleCommon to be able to render the full spec of Google Font API axis:

 - Italic - `ital`
 - Optical Size - `opsz`
 - Slant - `slnt`
 - Weight - `wght`
 - Width - `wdth`
- Casual - `CASL`
- Cursive - `CRSV`
- Expression - `XPRN`
- Grade - `GRAD`
- Monospace - `MONO`
- Softness - `SOFT`
- Wonkiness - `WONK`
-
[https://developers.google.com/fonts/docs/css2](https://developers.google.com/fonts/docs/css2)
[https://fonts.google.com/variablefonts](https://fonts.google.com/variablefonts)



## Usage:
```javascript
const { assembleCommon } =  require("google-fonts-css2"
//or
import { assembleCommon } from "google-fonts-css2"

// assembleCommon(Array:families, String:display)

let url = assembleCommon([
	{
		family: "Cabin", //Family Name
		styles: [
			"600..700", //Range, if family supports it.
			"100..200italic", //Range with italic
			"300italic", //Weight with italic
			"regular", 	// Shortcut to 400
			"italic",	//Shortcut to 400 Italic
			"500", //regular with weight
			444	//regular weight for variable font
		]
	},
	{
		family: "Roboto", //Family Name - Roboto doesn't support ranges
		styles: [
			"300italic", //Weight with italic
			"regular", 	// Shortcut to 400
			"italic",	//Shortcut to 400 Italic
			"500",
			100
		]
	},
], 'swap') //display style

//The output will be:
"https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,444;0,500;0,600..700;1,100..200;1,300;1,400;1,600..700&family=Roboto:ital,wght@0,100;0,400;0,500;1,300;1,400&display=auto"
```

Check it here: [https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,444;0,500;0,600..700;1,100..200;1,300;1,400;1,600..700&family=Roboto:ital,wght@0,100;0,400;0,500;1,300;1,400&display=auto](https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,444;0,500;0,600..700;1,100..200;1,300;1,400;1,600..700&family=Roboto:ital,wght@0,100;0,400;0,500;1,300;1,400&display=auto)

## Example | Test
Run:
```bash
git clone git@github.com:adriano-tirloni/google-fonts-css2.git
yarn
yarn build:dev
node ./src/example.js
```
