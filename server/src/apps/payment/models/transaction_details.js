class TransactionDetails {
    constructor({
        bank_transaction_id, bank_approval_code,
        cardholder, response_message,
        booking_status, is_cancelled,
        order_id, last_updated_timestamp = new Date()
    }) {
        this.bank_transaction_id = bank_transaction_id;
        this.bank_approval_code = bank_approval_code;
        this.cardholder = cardholder;
        this.response_message = response_message;
        this.booking_status = booking_status;
        this.last_updated_timestamp = last_updated_timestamp;
        this.order_id = order_id;
        this.is_cancelled = is_cancelled;
    }

    static fromJson(json) {
        return new TransactionDetails({
            bank_transaction_id: json.bank_transaction_id,
            bank_approval_code: json.bank_approval_code,
            cardholder: json.cardholder,
            response_message: json.response_message,
            booking_status: json.booking_status,
            last_updated_timestamp: json.last_updated_timestamp,
            order_id: json.order_id,
            is_cancelled: json.is_cancelled
        })
    }
}

module.exports = TransactionDetails;