import { Category } from '../models/Category.js';

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
    const { search } = req.query;
    const searchValue = new RegExp(search, 'i');

    try {
        const { userId } = req;
        if (search) {
            const foundCategories = await Category.find({
                owner: userId,
                title: searchValue,
            });
            res.json(foundCategories);
        } else {
            const categories = await Category.find({
                owner: userId,
            });
            res.json(categories);
        }
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
