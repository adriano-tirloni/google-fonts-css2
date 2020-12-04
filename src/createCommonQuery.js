const createCommonQuery = ({ family, styles }) => {
  const sFamily = family.replace(/ +/g, "+");

  styles.forEach((style, i, a) => {

    if (!Array.isArray(style)){
      //not an array
      if (style.length > 3){
        //declarative
        if (style.length === 6)   { a[i] = '1,400'; return } //italic
        if (style.length === 7)   { a[i] = '0,400'; return } //regular
        if (style.length === 9)   { a[i] = '1,'+style.substring(0,3); return } //NNNitalic
        if (style.length === 8)   { a[i] = '0,'+style; return } //NNN..NNN
        if (style.length === 14)  { a[i] = '1,'+style.substring(0,8); return } //NNN..NNNitalic
      } else {
        //number only
        a[i] = '0,'+style
      }
    } else {
      //array
        a[i] = (Boolean(style[1]) ? 1 : 0)+','+style[0]
    }
  })

  return `family=${sFamily}:ital,wght@${styles.sort().join(";")}&`;
}

export default createCommonQuery