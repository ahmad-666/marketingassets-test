export const textTransform = (val: string) => {
  return val
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.substr(1)}`)
    .join(" ");
};
