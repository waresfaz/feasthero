class TransactionDetails {
    constructor({
        bankTransactionId, bankApprovalCode,
        cardholder, responseMessage,
        bookingStatus, isCancelled,
        orderId, lastUpdatedTimeStamp = new Date()
    }) {
        this.bankTransactionId = bankTransactionId;
        this.bankApprovalCode = bankApprovalCode;
        this.cardholder = cardholder;
        this.responseMessage = responseMessage;
        this.bookingStatus = bookingStatus;
        this.lastUpdatedTimeStamp = lastUpdatedTimeStamp;
        this.orderId = orderId;
        this.isCancelled = isCancelled;
    }

    static fromJson(json) {
        return new TransactionDetails({
            bankTransactionId: json.bankTransactionId,
            bankApprovalCode: json.bankApprovalCode,
            cardholder: json.cardholder,
            responseMessage: json.responseMessage,
            bookingStatus: json.bookingStatus,
            lastUpdatedTimeStamp: json.lastUpdatedTimeStamp,
            orderId: json.orderId,
            isCancelled: json.isCancelled
        })
    }
}

module.exports = TransactionDetails;