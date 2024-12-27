import { FC, useEffect, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/dropdowns/Dropdown';
import { LineChart, PieChart } from '@mui/x-charts';
import { network } from '../../services/network/network';

import { Record as RecordX } from '../../models/records';
import { Category } from '../../models/categories';
import { MenuItem, Select } from '@mui/material';

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

const FilterItemInput = styled.div`
    display: flex;
    column-gap: 8px;
    align-items: end;
`;

const Statistics: FC = () => {
    const navigate = useNavigate();

    const [records, setRecords] = useState<RecordX[]>([]);
    const [categoriesRequest, setCategoriesRequest] = useState<Category[]>([]);

    const [chart, setChart] = useState(0);

    useEffect(() => {
        network.category.getAll().then(setCategoriesRequest);
    }, []);
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

    const [statisticsType, setStatisticsType] = useState(categories[0]);

    const data = [
        { name: 'Page A', value: 2444, uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', value: 2832, uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', value: 5311, uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', value: 9521, uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', value: 1111, uv: 1890, pv: 4800, amt: 2181 },
    ];

    useEffect(() => {
        network.record.getAll({}).then(setRecords);
    }, []);

    const [showGood, setShowGood] = useState(false);

    useEffect(() => {
        if (showGood) {
            const timeout = setTimeout(() => setShowGood(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [showGood]);

    const recordsForCategory: Record<number, RecordX[]> = {};

    for (const record of records) {
        if (!recordsForCategory[record.categoryId]) {
            recordsForCategory[record.categoryId] = [];
        }
        recordsForCategory[record.categoryId].push(record);
    }

    if (records.length === 0) {
        return (
            <Wrapper>
                <PageWrapper>
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
                            <h1>Записей нет</h1>
                        </StatisticsWrapper>
                    </MainWrapper>
                </PageWrapper>
            </Wrapper>
        );
    }

    const allDays = days(records);

    const categoriesT = [];
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
        console.log(id);
        return categoriesRequest.find((c) => c.id === id)?.name ?? 'def';
    };

    const series = recordsT.map((r, i) => ({
        data: r,
        label: categoryName(categoriesT[i]),
    }));

    return (
        <Wrapper>
            <PageWrapper>
                <CategorySelector categories={categories} onSelect={() => {}} />
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
                                series={series}
                                yAxis={[
                                    {
                                        label: 'Сумма, р',
                                    },
                                ]}
                                xAxis={[
                                    {
                                        data: allDays.map((d) => new Date(+d)),
                                        valueFormatter: (d) =>
                                            new Date(+d).toLocaleDateString(
                                                'ru-RU'
                                            ),
                                        label: 'Дата',
                                    },
                                ]}
                                //     allDays.map((d) => ({
                                //     data: allDays,
                                //     label: new Date(+d).toLocaleDateString(
                                //         'ru-RU'
                                //     ),
                                // }))}
                            ></LineChart>
                        )}
                    </StatisticsWrapper>
                    <FiltersWrapper>
                        <FiltersTitle>Фильтры</FiltersTitle>
                        <Filters>
                            <FilterItem>
                                <FilterItemTitle>Дата</FilterItemTitle>
                                <FilterItemInput>
                                    от:
                                    <Input height="small" />
                                    до:
                                    <Input height="small" />
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
                        </Filters>
                    </FiltersWrapper>
                </MainWrapper>
            </PageWrapper>
        </Wrapper>
    );
};

function days(records: RecordX[]): string[] {
    const daysA = records.map((r) => r.date);

    const daysB = Array.from(new Set(daysA));
    daysB.sort();
    return daysB;
}

function groupByDay(records: RecordX[], days: string[]): RecordX[][] {
    return days.map((day) => records.filter((r) => r.date === day));
}

export default Statistics;
