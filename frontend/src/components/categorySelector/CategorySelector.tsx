import styled from '@emotion/styled';

const CategoryButton = styled.button<{ active: boolean }>`
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ active, theme }) =>
        active ? theme.colors.background : theme.colors.primaryText};
    background-color: ${({ active, theme }) =>
        active ? theme.colors.primary : theme.colors.lightPrimary};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.1s ease;
`;

const CategoryContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
`;

interface CategoryItem {
    id: number;
    name: string;
}

interface Props {
    categories?: CategoryItem[];
    selectedId?: number;
    onSelectId: (categoryId: number) => void;
}

const CategorySelector: React.FC<Props> = ({
    categories = [],
    onSelectId,
    selectedId = -1,
}) => {
    return (
        <CategoryContainer>
            <CategoryButton
                key={-1}
                active={selectedId == -1}
                onClick={() => onSelectId(-1)}
            >
                Все
            </CategoryButton>
            {categories.map((category) => (
                <CategoryButton
                    key={category.id}
                    active={selectedId == category.id}
                    onClick={() => onSelectId(category.id)}
                >
                    {category.name}
                </CategoryButton>
            ))}
        </CategoryContainer>
    );
};

export default CategorySelector;
