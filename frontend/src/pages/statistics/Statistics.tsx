import { FC, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import Input from '../../components/inputs/Input';
import Dropdown from '../../components/dropdowns/Dropdown';
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

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
                        <ResponsiveContainer width="100%" height={400}>
                            {statisticsType.id === 2 ? (
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#8884d8"
                                        label
                                    >
                                        {data.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    index % 2 === 0
                                                        ? '#8884d8'
                                                        : '#82ca9d'
                                                }
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            ) : (
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="pv"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
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
                                    <Dropdown
                                        onSelect={(item) =>
                                            setStatisticsType(item)
                                        }
                                        width="wide"
                                        items={[
                                            { id: 1, name: 'График' },
                                            { id: 2, name: 'Диаграмма' },
                                        ]}
                                    />
                                </FilterItemInput>
                            </FilterItem>
                        </Filters>
                    </FiltersWrapper>
                </MainWrapper>
            </PageWrapper>
        </Wrapper>
    );
};

export default Statistics;
