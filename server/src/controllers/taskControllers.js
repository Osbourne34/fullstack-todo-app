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
        const { category, limit, page } = req.query;

        const searchParams = {
            owner: userId,
        };

        if (category) searchParams.category = category;

        const tasks = await Task.find(searchParams)
            .limit(limit)
            .skip(limit * page)
            .populate(['category', 'priority']);

        const count = await Task.countDocuments(searchParams);

        res.json({ tasks, count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const getInCompletedTasks = async (req, res) => {
    const userId = req.userId;
    try {
        const inCompletedTasks = await Task.find({
            owner: userId,
            completed: false,
        }).countDocuments();
        res.json(inCompletedTasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const update = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const updated = await Task.findOneAndUpdate(
            {
                owner: userId,
                _id: id,
            },
            { ...req.body },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const switchTaskExecution = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { completed } = req.body;

        const updated = await Task.findOneAndUpdate(
            {
                owner: userId,
                _id: id,
            },
            { completed },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const remove = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deleted = await Task.findOneAndDelete({
            owner: userId,
            _id: id,
        });
        res.json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
