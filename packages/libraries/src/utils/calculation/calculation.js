export const partCostCal = items => {
  let cost = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].requiredParts) {
      for (let j = 0; j < items[i].requiredParts.length; j++) {
        if (items[i].requiredParts[j].options) {
          const { selected } = items[i].requiredParts[j] ?? '';
          for (let k = 0; k < items[i].requiredParts[j].options.length; k++) {
            if (selected === items[i].requiredParts[j].options[k].id) {
              cost += items[i].requiredParts[j].options[k].price;
            }
          }
        }
      }
    }
  }

  return cost;
};

export const laborCostCal = items => {
  let cost = 0;
  for (let i = 0; i < items.length; i++) {
    cost += items[i].laborCost;
  }
  return cost;
};

export function toCurrency(num) {
  return num ? `$${num.toFixed(2)}` : '';
}
