class CalculateTotals {
    static totals(bookingSize, costPerDevice, mealKitPrice, bookingSizeWithMealKit, mealKitsBooked) {
        let mealKitsTotal = 0;
        if (mealKitsBooked)
        mealKitsTotal = this.mealKitsTotal(mealKitPrice, bookingSizeWithMealKit);
            
        const subTotal = this._subTotal(bookingSize, costPerDevice, mealKitsTotal);
        const tax = this._tax(subTotal);
        const grandTotal = this._grandTotal(tax, subTotal);

        return {
            tax: tax.toFixed(2),
            mealKitsTotal: mealKitsTotal.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            subTotal: subTotal.toFixed(2),
        }
    }

    static mealKitsTotal(mealKitPrice, bookingSizeWithMealKit) {
        return mealKitPrice * bookingSizeWithMealKit;
    }

    static _subTotal(bookingSize, costPerDevice, mealKitsTotal) {
        return bookingSize * costPerDevice + mealKitsTotal;
    }

    static _tax(subTotal) {
        return subTotal * 0.13;
    }

    static _grandTotal(tax, subTotal) {
        return tax + subTotal;
    }
}

export default CalculateTotals;