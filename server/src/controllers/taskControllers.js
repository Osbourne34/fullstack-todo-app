import { Task } from '../models/Task.js';
import { CategorySchema } from '../models/Category.js';

export const create = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, deadline, category, priority } = req.body;

        const todo = await Task.create({
            title,
            owner: userId,
            deadline,
            category,
            priority,
        });

        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const getAll = async (req, res) => {
    try {
        const userId = req.userId;

        const todos = await Task.find({
            owner: userId,
        }).populate(['category', 'priority']);

        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
