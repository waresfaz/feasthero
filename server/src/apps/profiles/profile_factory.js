const { CUSTOMER, ADMIN, CHEF } = require("../../constants/app_constants");
const Admin = require("./admin/schema/admin");
const Chef = require("./chef/schema/chef");
const Customer = require("./customer/schema/customer");

class ProfileFactory {
    static getProfile(type) {
        switch (type) {
            case CUSTOMER:
                return new Customer()
            case ADMIN:
                return new Admin()
            case CHEF:
                return new Chef()
        }
    }
}

module.exports = ProfileFactory;