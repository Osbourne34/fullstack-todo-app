import { useAppSelector } from '../redux';
import { auth } from '../../features/auth';

export const useAuth = () => {
    const { token, user } = useAppSelector(auth);

    return { token, user };
};
