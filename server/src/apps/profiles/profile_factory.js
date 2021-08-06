const { CUSTOMER, ADMIN, CHEF } = require("../../constants/app_constants");
const Admin = require("./admin/schema/admin");
const Chef = require("./chef/schema/chef");
const Customer = require("./customer/schema/customer");

class ProfileFactory {
    static getProfile(type, data) {
        switch (type) {
            case CUSTOMER:
                return new Customer(data)
            case ADMIN:
                return new Admin(data)
            case CHEF:
                return new Chef(data)
        }
    }
}

module.exports = ProfileFactory;