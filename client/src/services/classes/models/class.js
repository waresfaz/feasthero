import Chef from '../../chefs/models/chef';
class Class {
    constructor(
        title, cost, thumbnail, description, duration,
        chefId, hasMealKit, mealKitPrice, recipe, chefs, id, schedule
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
        this.schedule = schedule;
    }

    static fromJson(json) {
        let chefs = json.chefs.map(chef => Chef.fromJson(chef));
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
            chefs,
            json._id,
            json.schedule,
        )
    }
}

export default Class;