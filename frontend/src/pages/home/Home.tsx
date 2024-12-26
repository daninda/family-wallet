import { FC, useEffect, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/dropdowns/Dropdown';
import Input from '../../components/inputs/Input';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modals/Modal';
import { Category } from '../../models/categories';
import { network } from '../../services/network/network';
import { Record } from '../../models/records';
import { sorts } from './consts';

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
    justify-content: space-between;
    margin-top: 16px;
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
    position: sticky;
    top: 16px;
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

const FilterItemInput = styled.div<{ two?: boolean }>`
    display: flex;
    flex-direction: ${({ two }) => (two ? 'column' : 'row')};
    gap: 8px;
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
    margin: 16px 0 0;
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

const GetRecordsForView = (records: Record[]) => {
    const result = new Map<string, Record[]>();

    records.forEach((record) => {
        const dateString = new Date(parseInt(record.date)).toLocaleDateString(
            'ru-RU',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }
        );

        if (!result.has(dateString)) {
            result.set(dateString, []);
        }
        result.get(dateString)?.push(record);
    });

    return result;
};

const getTotalPrice = (records: Record[]) => {
    return records.reduce((acc, record) => {
        return acc + record.price;
    }, 0);
};

export interface ExpenseForm {
    categoryId: number;
    subcategoryId: number;
    description: string;
    price: number;
    date: string;
}

const Home: FC = () => {
    const navigate = useNavigate();

    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    const [subcategories, setSubcategories] = useState<Category[]>([]);

    const [recordsLoading, setRecordsLoading] = useState(true);
    const [records, setRecords] = useState<Record[]>([]);

    const [sortId, setSortId] = useState(1);
    const [categoryId, setCategoryId] = useState(-1);
    const [subcategoryId, setSubcategoryId] = useState(-1);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState(
        new Date().toLocaleDateString('en-CA')
    );

    const [limitation, setLimitation] = useState(0);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [subcategoriesForAdd, setSubcategoriesForAdd] = useState<Category[]>(
        []
    );

    const [categoryIdForAdd, setCategoryIdForAdd] = useState(-1);
    const [subcategoryIdForAdd, setSubcategoryIdForAdd] = useState(-1);
    const [descriptionForAdd, setDescriptionForAdd] = useState('');
    const [costForAdd, setCostForAdd] = useState(0);
    const [dateForAdd, setDateForAdd] = useState('');

    const [categoryIdForAddError, setCategoryIdForAddError] = useState('');
    const [subcategoryIdForAddError, setSubcategoryIdForAddError] =
        useState('');
    const [descriptionForAddError, setDescriptionForAddError] = useState('');
    const [costForAddError, setCostForAddError] = useState('');
    const [dateForAddError, setDateForAddError] = useState('');

    const clearErrors = () => {
        setCategoryIdForAddError('');
        setSubcategoryIdForAddError('');
        setDescriptionForAddError('');
        setCostForAddError('');
        setDateForAddError('');
    };

    const handleAddExpense = () => {
        clearErrors();

        let hasError = false;

        if (categoryIdForAdd === -1) {
            setCategoryIdForAddError('Выберите категорию');
            hasError = true;
        }
        if (subcategoryIdForAdd === -1) {
            setSubcategoryIdForAddError('Выберите подкатегорию');
            hasError = true;
        }
        if (descriptionForAdd.length < 1 || descriptionForAdd.length > 256) {
            setDescriptionForAddError(
                'Введите описание (от 1 до 256 символов)'
            );
            hasError = true;
        }
        if (!costForAdd || costForAdd < 1 || costForAdd > 100000) {
            setCostForAddError('Введите стоимость (от 1 до 100000 рублей)');
            hasError = true;
        }
        if (dateForAdd === '') {
            setDateForAddError('Введите корректную дату');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        network.record
            .create({
                subсategoryId: subcategoryIdForAdd,
                description: descriptionForAdd,
                price: costForAdd,
                date: new Date(dateForAdd).getTime(),
            })
            .then(
                () => {
                    setRecordsLoading(true);
                    network.record
                        .getAll({
                            categoryId,
                            sortBy:
                                sorts.find((s) => s.id === sortId)?.value ||
                                'date_asc',
                        })
                        .then(
                            (response) => {
                                setRecords(response);
                                setRecordsLoading(false);
                            },
                            () => {
                                setRecordsLoading(false);
                            }
                        );
                },
                () => {}
            );
        setIsAddModalOpen(false);
    };

    useEffect(() => {
        if (categoryIdForAdd === -1) {
            setSubcategoriesForAdd([]);
            return;
        }

        network.subcategory.getAll({ categoryId: categoryIdForAdd }).then(
            (response) => {
                setSubcategoriesForAdd(response);
            },
            () => {}
        );
    }, [categoryIdForAdd]);

    useEffect(() => {
        setCategoriesLoading(true);
        network.category.getAll().then(
            (response) => {
                setCategories(response);
                setCategoriesLoading(false);
            },
            () => {
                setCategoriesLoading(false);
            }
        );

        setRecordsLoading(true);
        network.record.getAll({}).then(
            (response) => {
                setRecords(response);
                setRecordsLoading(false);
            },
            () => {
                setRecordsLoading(false);
            }
        );

        network.user.get().then(
            (response) => {
                setLimitation(response.limitation);
            },
            () => {}
        );
    }, []);

    useEffect(() => {
        setRecordsLoading(true);
        network.record
            .getAll({
                categoryId,
                subcategoryId,
                sortBy: sorts.find((s) => s.id === sortId)?.value || 'date_asc',
                minPrice: priceFrom,
                maxPrice: priceTo,
                from: new Date(dateFrom).getTime(),
                to: new Date(dateTo).getTime(),
            })
            .then(
                (response) => {
                    setRecords(response);
                    setRecordsLoading(false);
                },
                () => {
                    setRecordsLoading(false);
                }
            );
    }, [
        categoryId,
        subcategoryId,
        sortId,
        priceFrom,
        priceTo,
        dateFrom,
        dateTo,
    ]);

    useEffect(() => {
        setSubcategoryId(-1);
        if (categoryId === -1) {
            return;
        }
        network.subcategory.getAll({ categoryId }).then(
            (response) => {
                setSubcategories(response);
            },
            () => {}
        );
    }, [categoryId]);

    return (
        <Wrapper>
            <PageWrapper>
                {records &&
                    records.length > 0 &&
                    limitation > 0 &&
                    getTotalPrice(records) > limitation && (
                        <ExpenseAlert>
                            Ваш лимит трат превышен: {getTotalPrice(records)} /{' '}
                            {limitation}
                        </ExpenseAlert>
                    )}
                {!categoriesLoading && (
                    <CategorySelector
                        categories={categories || []}
                        selectedId={categoryId}
                        onSelectId={(id) => {
                            setCategoryId(id);
                        }}
                    />
                )}
                <Title>Все траты</Title>
                <Tools>
                    <Dropdown
                        items={sorts}
                        selectedId={sortId}
                        onSelectId={(id) => setSortId(id)}
                    />
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
                        {!recordsLoading &&
                            [...GetRecordsForView(records || []).entries()].map(
                                (val) => {
                                    const dateString = val[0];
                                    const recordsForDay = val[1];
                                    return (
                                        <ExpensesGroup key={dateString}>
                                            <ExpensesGroupTitle>
                                                {dateString}
                                            </ExpensesGroupTitle>
                                            {recordsForDay.map((r) => (
                                                <ExpensesGroupItem key={r.id}>
                                                    <ExpensesGroupItemCategory>
                                                        {r.category} -{' '}
                                                        {r.subcategory}
                                                    </ExpensesGroupItemCategory>
                                                    <ExpenseGroupItemInfo>
                                                        <ExpenseGroupItemLeft>
                                                            <ExpenseGroupItemCost>
                                                                {r.price} руб.
                                                            </ExpenseGroupItemCost>
                                                            <ExpenseGroupItemDesc>
                                                                {r.description}
                                                            </ExpenseGroupItemDesc>
                                                        </ExpenseGroupItemLeft>
                                                        <ExpenseGroupItemDate>
                                                            {new Date(
                                                                parseInt(r.date)
                                                            ).toLocaleTimeString(
                                                                'ru-RU',
                                                                {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                }
                                                            )}
                                                        </ExpenseGroupItemDate>
                                                    </ExpenseGroupItemInfo>
                                                </ExpensesGroupItem>
                                            ))}
                                        </ExpensesGroup>
                                    );
                                }
                            )}
                    </ExpensesWrapper>

                    <FiltersWrapper>
                        <FiltersTitle>Фильтры</FiltersTitle>
                        <Filters>
                            <FilterItem>
                                <FilterItemTitle>Стоимость</FilterItemTitle>
                                <FilterItemInput>
                                    от:
                                    <Input
                                        height="small"
                                        value={priceFrom.toString()}
                                        onChange={(e) =>
                                            setPriceFrom(
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                    до:
                                    <Input
                                        height="small"
                                        value={priceTo.toString()}
                                        onChange={(e) =>
                                            setPriceTo(parseInt(e.target.value))
                                        }
                                    />
                                </FilterItemInput>
                            </FilterItem>
                            <FilterItem>
                                <FilterItemTitle>Дата</FilterItemTitle>
                                <FilterItemInput two>
                                    от:
                                    <Input
                                        type="date"
                                        height="small"
                                        isWide
                                        value={dateFrom}
                                        onChange={(e) =>
                                            setDateFrom(e.target.value)
                                        }
                                    />
                                    до:
                                    <Input
                                        type="date"
                                        height="small"
                                        isWide
                                        value={dateTo}
                                        onChange={(e) =>
                                            setDateTo(e.target.value)
                                        }
                                    />
                                </FilterItemInput>
                            </FilterItem>
                            {categoryId != -1 && (
                                <FilterItem>
                                    <FilterItemTitle>
                                        Подкатегория
                                    </FilterItemTitle>
                                    <FilterItemInput>
                                        <Dropdown
                                            items={subcategories || []}
                                            placeholder="Все подкатегории"
                                            width="wide"
                                            selectedId={subcategoryId}
                                            onSelectId={(subcategoryId) =>
                                                setSubcategoryId(subcategoryId)
                                            }
                                        />
                                    </FilterItemInput>
                                </FilterItem>
                            )}
                        </Filters>
                    </FiltersWrapper>
                </MainWrapper>
                {isAddModalOpen && (
                    <Modal onClose={() => setIsAddModalOpen(false)}>
                        <h2
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Добавить трату
                        </h2>
                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '24px',
                                marginTop: '48px',
                            }}
                        >
                            <div>
                                <Dropdown
                                    items={categories || []}
                                    placeholder="Выберите категорию"
                                    width="wide"
                                    selectedId={categoryIdForAdd}
                                    onSelectId={(categoryId) => {
                                        setCategoryIdForAdd(categoryId);
                                        if (categoryIdForAddError) {
                                            setCategoryIdForAddError('');
                                        }
                                    }}
                                    error={categoryIdForAddError}
                                />
                            </div>
                            <div>
                                <Dropdown
                                    items={subcategoriesForAdd || []}
                                    placeholder="Выберите подкатегорию"
                                    width="wide"
                                    selectedId={subcategoryIdForAdd}
                                    onSelectId={(subcategoryId) => {
                                        setSubcategoryIdForAdd(subcategoryId);
                                        if (subcategoryIdForAddError) {
                                            setSubcategoryIdForAddError('');
                                        }
                                    }}
                                    error={subcategoryIdForAddError}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Описание"
                                    placeholder="Описание"
                                    type="text"
                                    height="medium"
                                    isWide
                                    onChange={(e) => {
                                        setDescriptionForAdd(e.target.value);
                                        if (descriptionForAddError) {
                                            setDescriptionForAddError('');
                                        }
                                    }}
                                    value={descriptionForAdd}
                                    error={descriptionForAddError}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Стоимость"
                                    placeholder="Стоимость"
                                    type="number"
                                    height="medium"
                                    isWide
                                    onChange={(e) => {
                                        setCostForAdd(
                                            Number.parseInt(e.target.value)
                                        );
                                        if (costForAddError) {
                                            setCostForAddError('');
                                        }
                                    }}
                                    value={costForAdd.toString()}
                                    error={costForAddError}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Дата и время"
                                    placeholder="Дата"
                                    type="datetime-local"
                                    height="medium"
                                    isWide
                                    onChange={(e) => {
                                        setDateForAdd(e.target.value);

                                        if (dateForAddError) {
                                            setDateForAddError('');
                                        }
                                    }}
                                    value={dateForAdd}
                                    error={dateForAddError}
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
