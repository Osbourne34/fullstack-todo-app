import { Category } from '../models/Category.js';
import { Task } from '../models/Task.js';

export const create = async (req, res) => {
    try {
        const { userId } = req;
        const { title } = req.body;

        const candidate = await Category.find({ owner: userId, title });
        if (candidate.length) {
            return res.status(400).json({
                message: 'Категория с таким именем уже существует',
            });
        }

        const category = await Category.create({
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
    const { userId } = req;
    const { search } = req.query;
    const searchValue = new RegExp(search, 'i');

    const searchParams = {
        owner: userId,
    };

    if (search) {
        searchParams.title = searchValue;
    }

    try {
        const tasks = await Task.find({
            completed: false,
            category: { $ne: null },
        });
        const categories = await Category.find(searchParams).transform(
            (res) => {
                return res.map((category) => {
                    const inCompleted = tasks.filter(
                        (task) =>
                            String(task.category) === String(category._id),
                    );
                    return {
                        ...category._doc,
                        inCompleteTasks: inCompleted.length,
                    };
                });
            },
        );

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

        const candidate = await Category.findOne({
            owner: userId,
            title,
        });

        if (candidate) {
            return res.status(400).json({
                message: 'Категория с таким именем уже существует',
            });
        }

        const updated = await Category.findOneAndUpdate(
            { owned: userId, _id: id },
            { title },
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

        const deleted = await Category.findOneAndDelete({
            owner: userId,
            _id: id,
        });
        res.json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
