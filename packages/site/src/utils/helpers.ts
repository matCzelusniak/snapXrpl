export const stringToHex = (strIn) => {
  let str = '';
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < strIn.length; i++) {
    str += strIn[i].charCodeAt(0).toString(16);
  }
  return str;
};
