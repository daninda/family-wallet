import { FC } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const PageWrapper = styled.div`
    padding-top: 16px;
    padding-bottom: 32px;
`;

const PageTitle = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
`;

const Tools = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-top: 16px;
    margin-bottom: 32px;
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
`;

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    width: 480px;
`;

const Category = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
`;

const CategoryTitle = styled.h3`
    font-size: 14px;
    font-weight: 500;
`;

const IconButton = styled.button`
    height: 24px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const SubCategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    padding-left: 64px;
`;

const Categories: FC = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <PageWrapper>
                <PageTitle>Категории</PageTitle>
                <Tools>
                    <Button
                        color="white"
                        height="large"
                        width="medium"
                        title="Назад"
                        onClick={() => navigate('/')}
                    />
                </Tools>
                <CategoriesWrapper>
                    <CategoryWrapper>
                        <Category>
                            <CategoryTitle>Категория 1</CategoryTitle>
                            <IconButton>
                                <AiOutlineClose size={24} />
                            </IconButton>
                        </Category>
                        <SubCategoriesWrapper>
                            <Category>
                                <CategoryTitle>Подкатегория 1</CategoryTitle>
                                <IconButton>
                                    <AiOutlineClose size={24} />
                                </IconButton>
                            </Category>
                            <Category>
                                <CategoryTitle>Подкатегория 2</CategoryTitle>
                                <IconButton>
                                    <AiOutlineClose size={24} />
                                </IconButton>
                            </Category>
                            <Button
                                height="large"
                                width="wide"
                                title="Добавить подкатегорию"
                            />
                        </SubCategoriesWrapper>
                        <Button
                            height="large"
                            width="wide"
                            title="Добавить категорию"
                        />
                    </CategoryWrapper>
                </CategoriesWrapper>
            </PageWrapper>
        </Wrapper>
    );
};

export default Categories;
