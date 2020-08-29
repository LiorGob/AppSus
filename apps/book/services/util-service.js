
export const utilService = {
    formatCurrency

}

function formatCurrency(num, currencyCode) {
    if (currencyCode === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
    else if (currencyCode === 'ILS') {
      return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    }
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(num);
  }