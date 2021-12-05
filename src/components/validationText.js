const arr_EN = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export function validationText(text, table, defaultValue) {
  let mas = text.split("");
  mas.forEach((el, i) => {
    if (el === " ") {
      mas.splice(i, 1);
    }
  });
  if (mas[0] === "=") {
    try {
      let newArray = [];
      for (let i = 1; i < mas.length; i++) {
        if (mas[i] !== "=") {
          newArray.push(mas[i]);
        }
      }
      let newText = newArray.join("");
      const regexp = /\d+\w/gim;
      let Cell = newText.match(regexp);
      if (Cell !== null) {
        Cell.forEach((el) => {
          let newRegexp = new RegExp(el, "gmi");
          newText = newText.replace(
            newRegexp,
            getCell(el, table, defaultValue)
              ? getCell(el, table, defaultValue)
              : el
          );
        });
      }
      if (eval(newText) === Infinity || eval(newText) === undefined) {
        return text;
      }
      return String(eval(newText));
    } catch (e) {
      return text;
    }
  }
  return text;
}

function getCell(el, table, defaultValue) {
  const mas = [];
  let letter = "";
  for (let i = 0; i < el.length; i++) {
    if (!isNaN(el[i])) {
      mas.push(el[i]);
    } else {
      letter = el[i];
    }
  }
  let number = Number(mas.join(""));
  const column = arr_EN.indexOf(letter.toUpperCase());
  return !isNaN(Number(table[number][column]))
    ? Number(table[number][column])
    : table[number][column] !== defaultValue
    ? Number(validationText(table[number][column], table, defaultValue))
      ? validationText(table[number][column], table, defaultValue)
      : null
    : null;
}
