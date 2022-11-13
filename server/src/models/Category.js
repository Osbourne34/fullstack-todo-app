import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
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
});

export const Category = model('Category', CategorySchema);
