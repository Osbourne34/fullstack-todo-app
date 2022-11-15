import { Schema, model } from 'mongoose';

const PrioritySchema = new Schema({
    title: {
        type: String,
        required: 'Обязательное поле',
        trim: true,
        lowercase: true,
    },
    color: {
        type: String,
        default: null,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Priority = model('Priority', PrioritySchema);
