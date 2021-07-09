class ClassDateTime {
    constructor(dateTime) {
        this.dateTime = dateTime;
    }

    static fromJson(json) {
        return new ClassDateTime(
            json.dateTime
        )
    }
}

export default ClassDateTime;