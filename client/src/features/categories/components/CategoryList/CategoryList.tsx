import React from 'react';

import { CategoryItem } from '../../components';

import { Category } from '../../../../types/Category';

interface CategoryListProps {
    categories: Category[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
    return (
        <>
            {categories.map(({ _id, title, inCompleteTasks }) => (
                <CategoryItem
                    key={_id}
                    link={_id}
                    title={title}
                    inCompleteTasks={inCompleteTasks}
                    editable
                />
            ))}
        </>
    );
};
