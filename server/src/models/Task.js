import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: 'Обязательное поле',
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    priority: {
        type: Schema.Types.ObjectId,
        ref: 'Priority',
        default: null,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export const Task = model('Task', TaskSchema);
