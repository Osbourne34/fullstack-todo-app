import { Priority } from '../models/Priority.js';

export const create = async (req, res) => {
    try {
        const { userId } = req;
        const { title } = req.body;

        const candidate = await Priority.find({ owner: userId, title });
        if (candidate.length) {
            return res.status(400).json({
                message: 'Приоритет с таким именем уже существует',
            });
        }

        const category = await Priority.create({
            owner: userId,
            title,
        });
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const getAll = async (req, res) => {
    try {
        const { userId } = req;
        const categories = await Priority.find({ owner: userId });
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const update = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;
        const { title } = req.body;

        const candidate = await Priority.findOne({
            owner: userId,
            title,
        });

        if (candidate) {
            return res.status(400).json({
                message: 'Приоритет с таким именем уже существует',
            });
        }

        const updated = await Priority.findOneAndUpdate(
            { owned: userId, _id: id },
            { ...req.body },
            { new: true },
        );
        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const remove = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;

        const deleted = await Priority.findOneAndDelete({
            owner: userId,
            _id: id,
        });
        res.json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
