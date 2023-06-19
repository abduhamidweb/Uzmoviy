import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
const actorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Ism maydoni to\'ldirilishi kerak'],
    },
    familyName: {
        type: String,
        required: [true, 'Familiya maydoni to\'ldirilishi kerak'],
    },
    dateOfBirth: {
        type: String,
        required: [true, "Tug'ilgan sana maydoni to\'ldirilishi kerak"],
    },
    placeOfBirth: {
        type: String,
        required: [true, "Tug'ilgan joy maydoni to\'ldirilishi kerak"],
    },
    image: {
        type: String,
        validate: {
            validator: (value) => {
                return validator.isURL(value);
            },
            message: (props) => `${props.value} - Noto'g'ri rasm URL manzili`,
        },
    },
    bio: {
        type: String,
        required: [true, 'Biografiya maydoni to\'ldirilishi kerak'],
    },
    moviesPlayed: {
        type: String,
    },
    movies: [{
            type: Types.ObjectId,
            ref: 'Movie',
            required: [true, 'Ko\'rib chiqilgan filmlar maydoni to\'ldirilishi kerak'],
        }],
});
export default mongoose.model('Actor', actorSchema);
