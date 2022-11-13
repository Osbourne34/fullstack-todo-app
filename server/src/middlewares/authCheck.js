import { SECRETKEY } from '../constants/key.js';
import jwt from 'jsonwebtoken';

export const authCheck = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({ message: 'Нет доступа' });
        }

        const decoded = jwt.verify(token, SECRETKEY);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Нет доступа', error });
    }
};
