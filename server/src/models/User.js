import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        login: {
            type: String,
            unique: true,
            require: 'Обязательное поле',
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: 'Обязательное поле',
        },
    },
    {
        timestamps: true,
    },
);

export const User = model('User', UserSchema);
