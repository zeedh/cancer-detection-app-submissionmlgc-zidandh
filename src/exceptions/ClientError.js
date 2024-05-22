class ClientError extends Error {
    constructor(message, statusCode = 400) {
        message = 'Terjadi kesalahan dalam melakukan prediksi.'
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
 
module.exports = ClientError;