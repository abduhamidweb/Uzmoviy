import * as validator from 'validator';
import * as mongoose from 'mongoose';
import { Contact } from '../interface/interface';


const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        validate: {
            validator: function (v: string) {
                return validator.default.isEmail(v);
            },
            message: 'Invalid email address'
        }
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
        validate: {
            validator: function (v: string) {
                return validator.default.isMobilePhone(v, 'any');
            },
            message: 'Invalid phone number'
        }
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }
});

export default mongoose.model<Contact>('Contact', contactSchema);