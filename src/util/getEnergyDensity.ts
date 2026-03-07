export default (energyKJ: number) => {
  // returns percentage of 100% density
  // (corn oil = 900kcal/100g)
  return Math.round(energyKJ / 37.656);
};
