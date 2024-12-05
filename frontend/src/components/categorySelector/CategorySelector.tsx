import { useState } from 'react';
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
  onSelect: (category: CategoryItem) => void;
}

const CategorySelector: React.FC<Props> = ({ categories = [], onSelect }) => {
  const allItem: CategoryItem = { id: -1, name: 'Все' };

  const [activeCategory, setActiveCategory] = useState<CategoryItem>(
    categories ? categories[0] : allItem
  );

  const handleCategoryClick = (category: CategoryItem) => {
    setActiveCategory(category);
    onSelect(category);
  };

  return (
    <CategoryContainer>
      <CategoryButton
        key={allItem.id}
        active={allItem.id == activeCategory.id}
        onClick={() => handleCategoryClick(allItem)}
      >
        {allItem.name}
      </CategoryButton>
      {categories.map((category) => (
        <CategoryButton
          key={category.id}
          active={category.id == activeCategory.id}
          onClick={() => handleCategoryClick(category)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </CategoryContainer>
  );
};

export default CategorySelector;
