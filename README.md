# 📃GOOGLE FONT CSS 2
## A Javascript package to integrate with Google Fonts API.

⚠️ *If you were using the v1 of this package check the new API below, it is slightly different. *

This is a package with a **single purpose**: To provide an easy interface to create the latest version of a Google Fonts CSS2 URL.

- It adheres to the rules described on [the current Google Fonts Documentation (CSS2)](https://developers.google.com/fonts/docs/css2 "Google Fonts Documentation (CSS2)").
- Works on browser and server side (**SSR**).
- Can create** Material Symbols** and **Material Icons** URLs

Read on for more information. 
Feel free to open issues or PRs.

------------

##### How it works?
> **You say**: 
Gimme **Open Sans**, from **light to bold**, **italic**. **condensed** and **normal**!

> **It answers:**
[https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75,300..700&family=Open+Sans:ital,wdth,wght@1,100,300..700&display=auto](https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@1,75,300..700&family=Open+Sans:ital,wdth,wght@1,100,300..700&display=auto)

------------

- **Get Started**
	- **NodeJS, Browser, Common-JS, ES-Modules**
	- **Functions**
	- **Android, IOS & Flutter**
- **Google Fonts**
	- **Regular Fonts**
	- **Variable Fonts**
	- **Variable Fonts Options**
- **Google Material Symbols**
	- **Variable Symbols Options**
- **Google Material Icons**
- **Validations**
- **Examples**

---
## Get Started
Writing docs...

### Functions
```javascript
  getGoogleFontsUrl([
      {family: 'Material Icons', styles: [ {wght: '500', wght: '501'} ]} ], 'swap')
```

## Input Validation
- ✅ Validates the existence of the directive axis used. (`weight or wght`, `opticalSize or opsz`)
- ✅ Ignores duplicate directives (`wght`) and uses the latest one.
- ❌ Does **not** validate if the font requested has the directive in its options. Eg: If you request **Open Sans**, asking for `slant -10` the URL will properly be created **BUT** Google will return a `400` answer as the **slant** directive is not avaliable for **Open Sans**
