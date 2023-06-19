import mongoose, { Schema, Document } from 'mongoose';
import { Img } from '../interface/interface';
import validator from 'validator';

const imgSchema: Schema = new Schema({
    imgLink: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return validator.isURL(value);
            },
            message: 'Img must only be URL'
        }
    },
});

export default mongoose.model<Img>('Img', imgSchema);
