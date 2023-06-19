import mongoose, { Document, Schema, Types } from 'mongoose';
import validator from 'validator';
import { IActor } from '../interface/interface';



const actorSchema: Schema<IActor> = new Schema({
    name: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
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
    bio: {
        type: String,
        required: true,
    },
    moviesPlayed: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true,
        },
    ],
});

export default mongoose.model<IActor>('Actor', actorSchema);
