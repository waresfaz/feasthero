class Class {
    constructor(
        title, cost, thumbnail, description, duration,
        chefId, hasMealKit, mealKitPrice, recipe, chefs, id
    ) {
        this.title = title;
        this.cost = cost;
        this.thumbnail = thumbnail;
        this.description = description;
        this.duration = duration;
        this.chefId = chefId;
        this.hasMealKit = hasMealKit;
        this.mealKitPrice = mealKitPrice;
        this.recipe = recipe;
        this.chefs = chefs;
        this.id = id;
    }

    static fromJson(json) {
        return new Class(
            json.title,
            json.cost,
            json.thumbnail,
            json.description,
            json.duration,
            json.chefId,
            json.hasMealKit,
            json.mealKitPrice,
            json.recipe,
            json.chefs,
            json._id,
        )
    }
}

export default Class;