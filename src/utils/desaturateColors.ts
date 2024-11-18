export const getDesaturatedColor = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const gray = Math.round(0.25 * r + 0.59 * g + 0.11 * b);

  return `rgb(${gray}, ${gray}, ${gray})`;
};
