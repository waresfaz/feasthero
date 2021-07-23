export default class CalculateTotals {
    static totals(bookingSize, costPerDevice, mealKitPrice, bookingSizeWithMealKit, mealKitsBooked) {
        let mealKitsTotal = 0;
        if (mealKitsBooked)
            mealKitsTotal = this._mealKitsTotal(mealKitPrice, bookingSizeWithMealKit);

        const devicesTotal = this._devicesTotal(costPerDevice, bookingSize)
        const subTotal = this._subTotal(devicesTotal, mealKitsTotal);
        const tax = this._tax(subTotal);
        const grandTotal = this._grandTotal(tax, subTotal);

        return {
            tax: tax.toFixed(2),
            mealKitsTotal: mealKitsTotal.toFixed(2),
            devicesTotal: devicesTotal.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            subTotal: subTotal.toFixed(2),
        }
    }

    static _devicesTotal(costPerDevice, bookingSize) {
        return costPerDevice * bookingSize;
    }

    static _mealKitsTotal(mealKitPrice, bookingSizeWithMealKit) {
        return mealKitPrice * bookingSizeWithMealKit;
    }

    static _subTotal(devicesTotal, mealKitsTotal) {
        return devicesTotal + mealKitsTotal;
    }

    static _tax(subTotal) {
        return subTotal * 0.13;
    }

    static _grandTotal(tax, subTotal) {
        return tax + subTotal;
    }
}
