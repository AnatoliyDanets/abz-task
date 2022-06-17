export function CorrectString(value) {
  const arrStr = value
    .split("")
    .map((el, i, a) => {
      if (a.length > 27) {
        return [a.slice(0, 27), "..."];
      }
      return a;
    })[0]
    .flat(Infinity)
    .join("");

  return arrStr;
}
