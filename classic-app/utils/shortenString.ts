export function shortenString(str: string, length = 9) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
}
