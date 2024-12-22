import { FC, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/dropdowns/Dropdown';
import Input from '../../components/inputs/Input';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modals/Modal';

const PageWrapper = styled.div`
    padding-top: 38px;
    padding-bottom: 32px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    margin-top: 16px;
`;

const Tools = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;

const Buttons = styled.div`
    display: flex;
    column-gap: 16px;
`;

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 16px;
`;

const FiltersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;
    margin-top: 16px;
`;

const FiltersTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
`;

const Filters = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    border: ${({ theme }) => `1px solid ${theme.colors.divider}`};
    border-radius: 4px;
    padding: 16px;
    width: 100%;
`;

const FilterItem = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;

const FilterItemTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
`;

const FilterItemInput = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: end;
`;

const ExpensesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;
    margin-top: 16px;
`;

const ExpensesGroup = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    width: 100%;
`;

const ExpensesGroupTitle = styled.h2`
    font-size: 16px;
    font-weight: 400;
`;

const ExpensesGroupItem = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 4px;
    padding: 8px 16px;
`;

const ExpensesGroupItemCategory = styled.p`
    font-size: 12px;
    font-weight: 400;
`;

const ExpenseGroupItemInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ExpenseGroupItemLeft = styled.div`
    display: flex;
    column-gap: 32px;
`;

const ExpenseGroupItemCost = styled.p`
    font-size: 16px;
    font-weight: 400;
`;

const ExpenseGroupItemDesc = styled.p`
    font-size: 16px;
    font-weight: 400;
`;

const ExpenseGroupItemDate = styled.p`
    font-size: 14px;
    font-weight: 400;
`;

const ExpenseAlert = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    margin: 32px 0;
    background-color: ${({ theme }) => theme.colors.accent};
    font-size: 24px;
    font-weight: 600;
`;

const Home: FC = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            name: 'Category 1',
        },
        {
            id: 2,
            name: 'Category 2',
        },
    ];

    const subcategories = [
        {
            id: 1,
            name: 'Subcategory 1',
        },
        {
            id: 2,
            name: 'Subcategory 2',
        },
    ];

    const sorts = [
        {
            id: 1,
            name: 'Сначала новые',
        },
        {
            id: 2,
            name: 'Сначала старые',
        },
        {
            id: 3,
            name: 'Сначала дорогие',
        },
        {
            id: 4,
            name: 'Сначала дешевые',
        },
    ];

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: '',
        subcategory: '',
        description: '',
        cost: 0,
        date: '',
    });

    const handleAddExpense = () => {
        console.log(newExpense);
    };

    return (
        <Wrapper>
            <PageWrapper>
                <ExpenseAlert>
                    Ваш лимит трат превышен: 25 000 / 20 000
                </ExpenseAlert>
                <CategorySelector categories={categories} onSelect={() => {}} />
                <Title>Все траты</Title>
                <Tools>
                    <Dropdown items={sorts} />
                    <Buttons>
                        <Button
                            height="large"
                            width="medium"
                            color="white"
                            title="Статистика"
                            onClick={() => navigate('/statistics')}
                        />
                        <Button
                            height="large"
                            width="medium"
                            title="Добавить трату"
                            onClick={() => setIsAddModalOpen(true)}
                        />
                    </Buttons>
                </Tools>
                <MainWrapper>
                    <ExpensesWrapper>
                        <ExpensesGroup>
                            <ExpensesGroupTitle>22 октября</ExpensesGroupTitle>
                            <ExpensesGroupItem>
                                <ExpensesGroupItemCategory>
                                    Category 1
                                </ExpensesGroupItemCategory>
                                <ExpenseGroupItemInfo>
                                    <ExpenseGroupItemLeft>
                                        <ExpenseGroupItemCost>
                                            1000 р
                                        </ExpenseGroupItemCost>
                                        <ExpenseGroupItemDesc>
                                            lskflsdkflsdkflsdf
                                        </ExpenseGroupItemDesc>
                                    </ExpenseGroupItemLeft>
                                    <ExpenseGroupItemDate>
                                        22:30
                                    </ExpenseGroupItemDate>
                                </ExpenseGroupItemInfo>
                            </ExpensesGroupItem>
                            <ExpensesGroupItem>
                                <ExpensesGroupItemCategory>
                                    Category 1
                                </ExpensesGroupItemCategory>
                                <ExpenseGroupItemInfo>
                                    <ExpenseGroupItemLeft>
                                        <ExpenseGroupItemCost>
                                            1000 р
                                        </ExpenseGroupItemCost>
                                        <ExpenseGroupItemDesc>
                                            lskflsdkflsdkflsdf
                                        </ExpenseGroupItemDesc>
                                    </ExpenseGroupItemLeft>
                                    <ExpenseGroupItemDate>
                                        22:30
                                    </ExpenseGroupItemDate>
                                </ExpenseGroupItemInfo>
                            </ExpensesGroupItem>
                        </ExpensesGroup>
                        <ExpensesGroup>
                            <ExpensesGroupTitle>22 октября</ExpensesGroupTitle>
                            <ExpensesGroupItem>
                                <ExpensesGroupItemCategory>
                                    Category 1
                                </ExpensesGroupItemCategory>
                                <ExpenseGroupItemInfo>
                                    <ExpenseGroupItemLeft>
                                        <ExpenseGroupItemCost>
                                            1000 р
                                        </ExpenseGroupItemCost>
                                        <ExpenseGroupItemDesc>
                                            lskflsdkflsdkflsdf
                                        </ExpenseGroupItemDesc>
                                    </ExpenseGroupItemLeft>
                                    <ExpenseGroupItemDate>
                                        22:30
                                    </ExpenseGroupItemDate>
                                </ExpenseGroupItemInfo>
                            </ExpensesGroupItem>
                        </ExpensesGroup>
                        <ExpensesGroup>
                            <ExpensesGroupTitle>22 октября</ExpensesGroupTitle>

                            <ExpensesGroupItem>
                                <ExpensesGroupItemCategory>
                                    Category 1
                                </ExpensesGroupItemCategory>
                                <ExpenseGroupItemInfo>
                                    <ExpenseGroupItemLeft>
                                        <ExpenseGroupItemCost>
                                            1000 р
                                        </ExpenseGroupItemCost>
                                        <ExpenseGroupItemDesc>
                                            lskflsdkflsdkflsdf
                                        </ExpenseGroupItemDesc>
                                    </ExpenseGroupItemLeft>
                                    <ExpenseGroupItemDate>
                                        22:30
                                    </ExpenseGroupItemDate>
                                </ExpenseGroupItemInfo>
                            </ExpensesGroupItem>
                            <ExpensesGroupItem>
                                <ExpensesGroupItemCategory>
                                    Category 1
                                </ExpensesGroupItemCategory>
                                <ExpenseGroupItemInfo>
                                    <ExpenseGroupItemLeft>
                                        <ExpenseGroupItemCost>
                                            1000 р
                                        </ExpenseGroupItemCost>
                                        <ExpenseGroupItemDesc>
                                            lskflsdkflsdkflsdf
                                        </ExpenseGroupItemDesc>
                                    </ExpenseGroupItemLeft>
                                    <ExpenseGroupItemDate>
                                        22:30
                                    </ExpenseGroupItemDate>
                                </ExpenseGroupItemInfo>
                            </ExpensesGroupItem>
                        </ExpensesGroup>
                    </ExpensesWrapper>
                    <FiltersWrapper>
                        <FiltersTitle>Фильтры</FiltersTitle>
                        <Filters>
                            <FilterItem>
                                <FilterItemTitle>Стоимость</FilterItemTitle>
                                <FilterItemInput>
                                    от:
                                    <Input height="small" />
                                    до:
                                    <Input height="small" />
                                </FilterItemInput>
                            </FilterItem>
                            <FilterItem>
                                <FilterItemTitle>Дата</FilterItemTitle>
                                <FilterItemInput>
                                    от:
                                    <Input height="small" />
                                    до:
                                    <Input height="small" />
                                </FilterItemInput>
                            </FilterItem>
                        </Filters>
                    </FiltersWrapper>
                </MainWrapper>
                {isAddModalOpen && (
                    <Modal onClose={() => setIsAddModalOpen(false)}>
                        <h2>Добавить трату</h2>
                        <form>
                            <div>
                                <Dropdown
                                    items={categories}
                                    placeholder="Категория"
                                    width="wide"
                                    onSelect={(category) =>
                                        setNewExpense({
                                            ...newExpense,
                                            category: category.name,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Dropdown
                                    items={subcategories}
                                    placeholder="Подкатегория"
                                    width="wide"
                                    onSelect={(category) =>
                                        setNewExpense({
                                            ...newExpense,
                                            subcategory: category.name,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Описание"
                                    type="text"
                                    height="medium"
                                    isWide
                                    onChange={(e) =>
                                        setNewExpense({
                                            ...newExpense,
                                            description: e.target.value,
                                        })
                                    }
                                    value={newExpense.description}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Стоимость"
                                    type="number"
                                    height="medium"
                                    isWide
                                    onChange={(e) =>
                                        setNewExpense({
                                            ...newExpense,
                                            cost: Number.parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    value={newExpense.cost.toString()}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder="Дата"
                                    type="date"
                                    height="medium"
                                    isWide
                                    onChange={(e) =>
                                        setNewExpense({
                                            ...newExpense,
                                            date: e.target.value,
                                        })
                                    }
                                    value={newExpense.date}
                                />
                            </div>
                            <Buttons>
                                <Button
                                    height="small"
                                    width="content"
                                    title="Готово"
                                    onClick={handleAddExpense}
                                />
                                <Button
                                    height="small"
                                    width="content"
                                    color="red"
                                    title="Отмена"
                                    onClick={() => setIsAddModalOpen(false)}
                                />
                            </Buttons>
                        </form>
                    </Modal>
                )}
            </PageWrapper>
        </Wrapper>
    );
};

export default Home;
