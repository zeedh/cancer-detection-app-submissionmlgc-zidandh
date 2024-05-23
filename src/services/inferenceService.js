const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classes = ['Cancer', 'Non-cancer'];
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        //const classResult = tf.argMax(prediction, 1).dataSync()[0];
        const label = confidenceScore > 99 ? classes[0] : classes[1];
 
        let explanation, suggestion;
 
        if(label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
 
        if(label === 'Non-cancer') {
            suggestion = "Tidak kanker, tapi segera konsultasi dengan dokter terdekat."
        }
 
        return { confidenceScore, label, explanation, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}
 
module.exports = predictClassification;