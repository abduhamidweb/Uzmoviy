import mongoose, { Document, Schema, Types } from 'mongoose';
import validator from 'validator';
import { IMovie } from '../interface/interface';



const movieSchema: Schema<IMovie> = new Schema({
    name: {
        type: String,
        required: [true, 'Film nomi maydoni to\'ldirilishi kerak'],
    },
    image: {
        type: String,
        validate: {
            validator: (value: string) => {
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


export default mongoose.model<IMovie>('Movie', movieSchema);
