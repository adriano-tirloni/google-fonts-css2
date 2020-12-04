const { assembleCommon } = require("../index");

console.log(
  assembleCommon(
    [
      {
        family: "Cabin",
        styles: [
          ["600..700", "italic"],
          "600..700",
          "100..200italic",
          "300italic",
          "regular",
          "italic",
          "500",
          444
        ]
      },
      {
        family: "Roboto",
        styles: [
          "300italic",
          "regular",
          "italic",
          500,
          "100"
        ]
      }
    ]
  )
)