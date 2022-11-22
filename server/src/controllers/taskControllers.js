import { Task } from '../models/Task.js';

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
        }).transform((todos) =>
            todos.map((todo) => ({
                ...todo._doc,
                deadline: todo.deadline.toLocaleDateString(),
            })),
        );

        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
