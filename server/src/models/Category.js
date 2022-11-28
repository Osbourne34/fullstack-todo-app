import { Schema, model } from 'mongoose';

export const CategorySchema = new Schema({
    title: {
        type: String,
        required: 'Обязательное поле',
        trim: true,
        lowercase: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    inCompleteTasks: {
        type: Number,
        default: 0,
    },
});

export const Category = model('Category', CategorySchema);
