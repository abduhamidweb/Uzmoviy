import mongoose, { Document, Schema, Types } from 'mongoose';
import validator from 'validator';
import { IMovie } from '../interface/interface';



const movieSchema: Schema<IMovie> = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        validate: {
            validator: (value: string) => {
                return validator.isURL(value);
            },
            message: 'Invalid image URL',
        },
    },
    actors: {
        type: [String],
        required: true,
    },
    filmofactor: [{
        type: Types.ObjectId,
        ref: "Actor",
        required: true,
    }]
});

export default mongoose.model<IMovie>('Movie', movieSchema);
