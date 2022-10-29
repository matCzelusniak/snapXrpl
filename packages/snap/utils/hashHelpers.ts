export const bytesToHex = (a): string => {
  return a
    .map((byteValue) => {
      const hex = byteValue.toString(16).toUpperCase();
      return hex.length > 1 ? hex : `0${hex}`;
    })
    .join('');
};
