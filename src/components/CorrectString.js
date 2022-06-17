export function CorrectString(value) {
  const arrStr = value
    .split("")
    .map((el, i, a) => {
      if (a.length > 29) {
        return [a.slice(0, 29), "..."];
      }
      return a;
    })[0]
    .flat(Infinity)
    .join("");

  return arrStr;
}
