import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        login: {
            type: String,
            unique: true,
            required: 'Обязательное поле',
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: 'Обязательное поле',
        },
    },
    {
        timestamps: true,
    },
);

export const User = model('User', UserSchema);
