import { FC } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import CategorySelector from '../../components/categorySelector/CategorySelector';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import Dropdown from '../../components/dropdowns/Dropdown';
import Input from '../../components/inputs/Input';

const PageWrapper = styled.div`
  margin-top: 38px;
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

const Home: FC = () => {
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

  return (
    <Wrapper>
      <PageWrapper>
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
            />
            <Button height="large" width="medium" title="Добавить трату" />
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
                    <ExpenseGroupItemCost>1000 р</ExpenseGroupItemCost>
                    <ExpenseGroupItemDesc>
                      lskflsdkflsdkflsdf
                    </ExpenseGroupItemDesc>
                  </ExpenseGroupItemLeft>
                  <ExpenseGroupItemDate>22:30</ExpenseGroupItemDate>
                </ExpenseGroupItemInfo>
              </ExpensesGroupItem>
              <ExpensesGroupItem>
                <ExpensesGroupItemCategory>
                  Category 1
                </ExpensesGroupItemCategory>
                <ExpenseGroupItemInfo>
                  <ExpenseGroupItemLeft>
                    <ExpenseGroupItemCost>1000 р</ExpenseGroupItemCost>
                    <ExpenseGroupItemDesc>
                      lskflsdkflsdkflsdf
                    </ExpenseGroupItemDesc>
                  </ExpenseGroupItemLeft>
                  <ExpenseGroupItemDate>22:30</ExpenseGroupItemDate>
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
                    <ExpenseGroupItemCost>1000 р</ExpenseGroupItemCost>
                    <ExpenseGroupItemDesc>
                      lskflsdkflsdkflsdf
                    </ExpenseGroupItemDesc>
                  </ExpenseGroupItemLeft>
                  <ExpenseGroupItemDate>22:30</ExpenseGroupItemDate>
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
                    <ExpenseGroupItemCost>1000 р</ExpenseGroupItemCost>
                    <ExpenseGroupItemDesc>
                      lskflsdkflsdkflsdf
                    </ExpenseGroupItemDesc>
                  </ExpenseGroupItemLeft>
                  <ExpenseGroupItemDate>22:30</ExpenseGroupItemDate>
                </ExpenseGroupItemInfo>
              </ExpensesGroupItem>
              <ExpensesGroupItem>
                <ExpensesGroupItemCategory>
                  Category 1
                </ExpensesGroupItemCategory>
                <ExpenseGroupItemInfo>
                  <ExpenseGroupItemLeft>
                    <ExpenseGroupItemCost>1000 р</ExpenseGroupItemCost>
                    <ExpenseGroupItemDesc>
                      lskflsdkflsdkflsdf
                    </ExpenseGroupItemDesc>
                  </ExpenseGroupItemLeft>
                  <ExpenseGroupItemDate>22:30</ExpenseGroupItemDate>
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
      </PageWrapper>
    </Wrapper>
  );
};

export default Home;
