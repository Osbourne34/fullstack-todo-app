import { User } from '../models/User.js';
import { SECRETKEY } from '../constants/key.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { login, password: pass } = req.body;

        const candidate = await User.findOne({ login });
        if (candidate) {
            return res.status(400).json({
                message: 'Пользователь с таким именем уже существует',
            });
        }

        const hashPassword = await bcrypt.hash(pass, 5);

        const user = await User.create({ login, password: hashPassword });

        const token = jwt.sign({ id: user._id }, SECRETKEY, {
            expiresIn: '1h',
        });

        const { password, ...userData } = user._doc;

        res.json({ user: userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const login = async (req, res) => {
    try {
        const { login, password: pass } = req.body;

        const user = await User.findOne({ login });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Неверный логин или пароль' });
        }

        const passwordHash = await bcrypt.compare(pass, user.password);
        if (!passwordHash) {
            return res
                .status(400)
                .json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign({ id: user._id }, SECRETKEY, {
            expiresIn: '1h',
        });

        const { password, ...userData } = user._doc;

        res.json({ user: userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};

export const me = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const { password, ...userData } = user._doc;

        res.json({ user: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Произошла ошибка', error });
    }
};
