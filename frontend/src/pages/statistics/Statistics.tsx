import { FC, useEffect, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import Input from '../../components/inputs/Input';
import { LineChart, PieChart } from '@mui/x-charts';
import { network } from '../../services/network/network';
import { Record as RecordX } from '../../models/records';
import { Category } from '../../models/categories';
import { MenuItem, Select } from '@mui/material';
import { Subcategory } from '../../models/subcategories';

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

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 16px;
`;

const StatisticsWrapper = styled.div`
    margin-top: 44px;
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

const FilterItemInput = styled.div<{ two?: boolean }>`
    display: flex;
    flex-direction: ${({ two }) => (two ? 'column' : 'row')};
    gap: 8px;
`;

const Statistics: FC = () => {
    const navigate = useNavigate();

    const [records, setRecords] = useState<RecordX[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [categoryId, setCategoryId] = useState(-1);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState(
        new Date().toLocaleDateString('en-CA')
    );

    const [dateFromError, setDateFromError] = useState('');
    const [dateToError, setDateToError] = useState('');

    const [chart, setChart] = useState(0);

    const clearFilterErrors = () => {
        setDateFromError('');
        setDateToError('');
    };

    useEffect(() => {
        network.category.getAll().then((data) => {
            setCategories(data == null ? [] : data);
        });
    }, []);

    useEffect(() => {
        let hasError = false;

        const now = new Date();
        now.setHours(23, 59, 59, 999);
        const from = new Date(dateFrom);
        from.setHours(0, 0, 0, 0);
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);

        if (
            from &&
            to &&
            (from > to || from.getTime() < 0 || to.getTime() > now.getTime())
        ) {
            setDateFromError('Введите корректные даты');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        if (categoryId != -1) {
            network.subcategory.getAll({ categoryId }).then((data) => {
                setSubcategories(data == null ? [] : data);
            });
        }

        network.record
            .getAll({
                categoryId,
                from: from.getTime(),
                to: to.getTime(),
            })
            .then((data) => {
                if (categoryId != -1) {
                    setRecords(
                        data.map((record) => {
                            return {
                                ...record,
                                categoryId: record.subcategoryId,
                                category: record.subcategory,
                            };
                        })
                    );
                } else {
                    setRecords(data == null ? [] : data);
                }
            });
    }, [categoryId, dateFrom, dateTo]);

    const recordsForCategory: Record<number, RecordX[]> = {};

    for (const record of records) {
        if (!recordsForCategory[record.categoryId]) {
            recordsForCategory[record.categoryId] = [];
        }
        recordsForCategory[record.categoryId].push(record);
    }

    const allDays = days(records);

    const categoriesT: number[] = [];
    const recordsT = [];
    for (const [categoryId, records] of Object.entries(recordsForCategory)) {
        const groupedDays = groupByDay(records, allDays).map((day) => {
            return day.reduce((acc, record) => {
                return acc + record.price;
            }, 0);
        });

        recordsT.push(groupedDays);
        categoriesT.push(+categoryId);
    }

    const categorySum = Object.values(recordsForCategory).map((records) => {
        return records.reduce((acc, record) => {
            return acc + record.price;
        }, 0);
    });

    const categoryName = (id: number): string => {
        if (categoryId != -1) {
            return subcategories.find((c) => c.id === id)?.name ?? '';
        } else {
            return categories.find((c) => c.id === id)?.name ?? '';
        }
    };

    const series = recordsT.map((r, i) => ({
        data: r,
        label: categoryName(categoriesT[i]),
    }));

    return (
        <Wrapper>
            <PageWrapper>
                <CategorySelector
                    categories={categories}
                    selectedId={categoryId}
                    onSelectId={(categoryId) => {
                        setCategoryId(categoryId);
                    }}
                />
                <Title>Статистика</Title>
                <Tools>
                    <Button
                        color="white"
                        height="large"
                        width="medium"
                        title="Назад"
                        onClick={() => navigate('/')}
                    />
                </Tools>
                <MainWrapper>
                    <StatisticsWrapper>
                        {chart === 1 ? (
                            <PieChart
                                series={[
                                    {
                                        data: categorySum.map((s, i) => ({
                                            value: s,
                                            label: categoryName(categoriesT[i]),
                                        })),
                                    },
                                ]}
                            ></PieChart>
                        ) : (
                            <LineChart
                                height={400}
                                series={series}
                                yAxis={[
                                    {
                                        label: 'Сумма, р',
                                    },
                                ]}
                                xAxis={[
                                    {
                                        dataKey: 'date',
                                        data: allDays,
                                        valueFormatter: (d) => {
                                            return new Intl.DateTimeFormat(
                                                'ru-RU',
                                                {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                }
                                            ).format(new Date(+d));
                                        },
                                        label: 'Дата',
                                    },
                                ]}
                            ></LineChart>
                        )}
                    </StatisticsWrapper>
                    <FiltersWrapper>
                        <FiltersTitle>Фильтры</FiltersTitle>
                        <Filters>
                            <FilterItem>
                                <FilterItemTitle>Дата</FilterItemTitle>
                                <FilterItemInput two>
                                    от:
                                    <Input
                                        type="date"
                                        height="small"
                                        isWide
                                        value={dateFrom}
                                        onChange={(e) => {
                                            setDateFrom(e.target.value);
                                            if (dateFromError || dateToError) {
                                                clearFilterErrors();
                                            }
                                        }}
                                    />
                                    до:
                                    <Input
                                        type="date"
                                        height="small"
                                        isWide
                                        value={dateTo}
                                        onChange={(e) => {
                                            setDateTo(e.target.value);
                                            if (dateFromError || dateToError) {
                                                clearFilterErrors();
                                            }
                                        }}
                                    />
                                </FilterItemInput>
                            </FilterItem>
                            <FilterItem>
                                <FilterItemTitle>
                                    Вид статистики
                                </FilterItemTitle>
                                <FilterItemInput>
                                    <Select
                                        defaultValue={0}
                                        sx={{ flex: 1 }}
                                        onChange={(e) =>
                                            setChart(+e.target.value)
                                        }
                                    >
                                        <MenuItem value={0}>График</MenuItem>
                                        <MenuItem value={1}>Диаграмма</MenuItem>
                                    </Select>
                                </FilterItemInput>
                            </FilterItem>
                            {(dateFromError || dateToError) && (
                                <FilterItem>
                                    <FilterItemTitle style={{ color: 'red' }}>
                                        {dateFromError || dateToError}
                                    </FilterItemTitle>
                                </FilterItem>
                            )}
                        </Filters>
                    </FiltersWrapper>
                </MainWrapper>
            </PageWrapper>
        </Wrapper>
    );
};

function days(records: RecordX[]): string[] {
    const daysA = records.map((r) => normalizeDate(+r.date).toString());

    const daysB = Array.from(new Set(daysA));
    daysB.sort();
    return daysB;
}

const normalizeDate = (date: Date | number) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
};

function groupByDay(records: RecordX[], days: string[]): RecordX[][] {
    return days.map((day) =>
        records.filter((r) => normalizeDate(+r.date).toString() == day)
    );
}

export default Statistics;
