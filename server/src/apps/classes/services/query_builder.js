const Class = require("../schemas/class");
const moment = require('moment-timezone');
const ObjectId = require('mongoose').Types.ObjectId;

const WEEK_FROM = moment
    .utc(new Date().toISOString())
    .tz('US/Eastern')
    .add(7, 'd')
    .toDate();

const WEEK_TO = moment
    .utc(new Date().toISOString())
    .tz('US/Eastern')
    .add(12, 'w')
    .toDate();


class ClassQueryBuilder {
    includeSchedule() {
        this.includeScheduleVar = true;
        return this;
    }

    onlyIncludeBookableTimeSlots() {
        this.onlyIncludeBookableTimeSlotsVar = true;
        return this;
    }

    includeChef() {
        this.includeChefVar = true;
        return this;
    }

    hideImportantChefDetails() {
        this.hideImportantChefDetailsVar = true;
        return this;
    }

    filterByClassId(classId) {
        this.filterByClassIdVar = classId;
        return this;
    }

    filterByChefId(chefId) {
        this.filterByChefIdVar = chefId;
        return this;
    }

    onlyFirstIndex() {
        this.onlyFirstIndexVar = true;
        return this;
    }

    sortSchedule() {
        this.sortScheduleVar = true;
        return this;
    }

    _buildSortScheduleQuery() {
        if (this.sortSchedule)
            return {
                $sort: {
                    "schedule.dateTime": 1,
                },
            }

        return { $match: {} }
    }

    _buildScheduleQuery() {


        return { $match: {} }
    }

    _buildFilterByClassIdQuery() {
        if (this.filterByClassIdVar)
            return {
                $match: {
                    _id: ObjectId(this.filterByClassIdVar),
                }
            }
        return { $match: {} }
    }

    _buildFilterByChefIdQuery() {
        if (this.filterByChefIdVar)
            return {
                $match: { chefId: ObjectId(this.filterByChefIdVar) },
            }

        return { $match: {} }
    }

    _buildChefQuery() {
        if (this.includeChefVar) {
            if (this.hideImportantChefDetailsVar) {
                return {
                    $lookup: {
                        from: "accounts",
                        as: "chefs",
                        let: { chefId: "$chefId" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$_id", "$$chefId"]
                                    }
                                },
                            },
                            {
                                '$project': {
                                    'profile.zoom': 0,
                                    'email': 0,
                                }
                            }
                        ]
                    },
                };
            }
            return {
                $lookup: {
                    from: "accounts",
                    localField: "chefId",
                    foreignField: "_id",
                    as: "chefs",
                },
            }
        }
        return { $match: {} }
    }

    async run() {
        const result = await Class.aggregate([
            this._buildFilterByClassIdQuery(),
            this._buildFilterByChefIdQuery(),
            this._buildChefQuery(),
            {
                $unwind: '$schedule'
            },
            {
                $match: {
                    "schedule.dateTime": { "$gte": WEEK_FROM, "$lte": WEEK_TO },
                    $expr: {
                        $eq: ['$schedule.avaliable', true]
                    },
                },
            },
            this._buildSortScheduleQuery(),
        ]);

        return this.onlyFirstIndexVar ? result[0] : result;
    }
}

module.exports = ClassQueryBuilder;