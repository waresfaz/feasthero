class CalculateTotals {
    static totals(bookingSize, costPerDevice, mealKitCost, bookingSizeWithmealKit, hasMealKits) {
        let mealKitTotal = 0;
        if (hasMealKits)
            mealKitTotal = this._mealKitTotal(mealKitCost, bookingSizeWithmealKit);

        const subTotal = this._subTotal(bookingSize, costPerDevice, mealKitTotal);
        const tax = this._tax(subTotal);
        const grandTotal = this._grandTotal(tax, subTotal);

        return {
            tax: tax.toFixed(2),
            mealKitTotal: mealKitTotal.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
        }
    }

    static _mealKitTotal(mealKitCost, bookingSizeWithmealKit) {
        return mealKitCost * bookingSizeWithmealKit;
    }

    static _subTotal(bookingSize, costPerDevice, mealKitTotal) {
        return bookingSize * costPerDevice + mealKitTotal;
    }

    static _tax(subTotal) {
        return subTotal * 0.13;
    }

    static _grandTotal(tax, subTotal) {
        return tax + subTotal;
    }
}

export default CalculateTotals;