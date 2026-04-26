export default (energyKJ: number) => {
  // returns percentage of 100% density
  // lard = 902kcal/100g = 3774kj/100g
  return Math.round(energyKJ / 37.74);
};
