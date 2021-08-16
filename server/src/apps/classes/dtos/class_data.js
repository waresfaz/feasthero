class ClassDataDto {
    constructor(title, description, thumbnail, costPerDevice, duration, mealKitCost, hasMealKit) {
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.costPerDevice = costPerDevice;
        this.duration = duration;
        this.mealKitCost = mealKitCost;
        this.hasMealKit = hasMealKit;
    }

    static fromJson(json) {
        return new ClassDataDto(
            json['title'],
            json['description'],
            json['thumbnail'],
            Number(json['costPerDevice']),
            Number(json['duration']),
            Number(json['mealKitCost']),
            json['hasMealKit'] === 'true' ? true : false,
        )
    }

    setThumbnail(thumbnail) {
        this.thumbnail = thumbnail;
    }
}

module.exports = ClassDataDto;