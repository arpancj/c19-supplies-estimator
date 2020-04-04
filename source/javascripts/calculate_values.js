const expenses = {
  familiesInput: document.getElementById('families-input'),
  familiesCountElements: document.querySelectorAll('.families-count'),
  familiesTotalElements: document.querySelectorAll('.families-total'),
  contingenciesTotalElements: document.querySelectorAll('.contingencies-total'),
  totalElements: document.querySelectorAll('.amount-total'),
  amountElements: document.querySelectorAll('[data-amount]'),

  costPerFamily: () => {
    let cost = 0;

    for (const item of commodities) {
      cost += item[4];
    }
    return cost;
  },

  contingenciesCost: () => Math.floor(expenses.costPerFamily() * (5 / 100)),
  totalCostPerFamily: () =>
    expenses.costPerFamily() + expenses.contingenciesCost(),

  familiesCount: () => parseInt(expenses.familiesInput.value),

  updateFamiliesCount: () => {
    expenses.familiesCountElements.forEach((element) => {
      element.innerHTML = expenses.familiesCount();
    });
  },

  updateFamiliesCost: () => {
    const amount = expenses.familiesCount() * expenses.costPerFamily();

    expenses.familiesTotalElements.forEach((element) => {
      element.innerHTML = amount;
    });
  },

  updateContingenciesCost: () => {
    const amount = expenses.familiesCount() * expenses.contingenciesCost();

    expenses.contingenciesTotalElements.forEach((element) => {
      element.innerHTML = amount;
    });
  },

  updateTotalCost: () => {
    const amount = Math.floor(
      expenses.familiesCount() * expenses.totalCostPerFamily()
    );

    expenses.totalElements.forEach((element) => {
      element.innerHTML = amount;
    });
  },

  updateCommoditiesCost: () => {
    expenses.amountElements.forEach((element) => {
      const amount = parseInt(element.getAttribute('data-amount'));
      element.innerHTML = amount * expenses.familiesCount();
    });
  },

  updateAmounts: () => {
    expenses.updateFamiliesCount();
    expenses.updateFamiliesCost();
    expenses.updateContingenciesCost();
    expenses.updateTotalCost();
    expenses.updateCommoditiesCost();
  },
};

expenses.familiesInput.addEventListener('change', expenses.updateAmounts);
expenses.updateAmounts();

console.log(expenses.familiesTotalElements);
