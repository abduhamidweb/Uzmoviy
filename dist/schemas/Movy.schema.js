import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
const movieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Film nomi maydoni to\'ldirilishi kerak'],
    },
    image: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isURL(value);
            },
            message: "Noto\'g'ri rasm URL manzili",
        },
    },
    actors: {
        type: String,
    },
    filmofactor: [{
            type: Types.ObjectId,
            ref: "Actor",
            required: [true, 'Aktorlar maydoni to\'ldirilishi kerak'],
        }]
});
export default mongoose.model('Movie', movieSchema);
