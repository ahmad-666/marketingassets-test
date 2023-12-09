//get simple string and convert it to url format
export const urlNormalize = (str: string) => {
  return str.replace(/\s{1,}/g, "-").replace(/\//g, "-");
};
//get url and convert it to text
export const textNormalize = (url: string) => {
  return url
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.substr(1)}`)
    .join(" ");
};
