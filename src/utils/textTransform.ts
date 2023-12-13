//get simple string and convert it to url format
export const urlNormalize = (str: string) => {
  return str.replace(/\s{1,}/g, "-").replace(/\//g, "-");
};
//get url and convert it to text
export const textNormalize = (url: string) => {
  return url.replace(/-/g, " ");
};
//get string and convert it to valid value that we can use JSON.parse on it
export const jsonNormalize = (str: string) => {
  return str.replace(/'/g, '"').replace(/\\/g, " ");
};
