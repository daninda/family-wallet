import { FC, useEffect, useState } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { Modal } from './Modal';
import { CategoryModal } from './CategoryModal';
import { network } from '../../services/network/network';
import { Category } from '../../models/categories';
import { SubcategoryModal } from './SubcategoryModal';
import { Subcategory } from '../../models/subcategories';
import { showErrorToast } from '../../utils/utils';
import { ToastContainer } from 'react-toastify';
import { Paper } from '@mui/material';
import { Row, Txt } from '../../components/Common';

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

const CategoryDiv = styled.div`
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

    const [categories, setCategories] = useState<Category[]>([]);

    const [deleteCategoryId, setDeleteCategoryId] = useState(2);
    const [confirm, setConfirm] = useState(false);

    const [deleteSubcategoryId, setDeleteSubcategoryId] = useState(3);
    const [confirmSub, setConfirmSub] = useState(false);

    const [categoryModal, setCategoryModal] = useState(false);
    const [subcategoryModal, setSubcategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null
    );
    const [subcategories, setSubcategories] = useState<
        Record<number, Subcategory[]>
    >({});

    useEffect(() => {
        network.category.getAll().then(setCategories);
    }, []);

    useEffect(() => {
        requestAllSubcategories();
    }, [categories]);

    const deleteCategory = (id: number) => {
        network.category.delete({ id }).then(() => {
            requestCategories();
        });
    };

    const deleteSubcategory = (id: number) => {
        network.subcategory.delete({ id }).then(() => {
            requestCategories();
        });
    };

    const saveSubcategory = (id: number, subcategories: Subcategory[]) => {
        setSubcategories((prev) => {
            return {
                ...prev,
                [id]: subcategories,
            };
        });
    };

    const requestCategories = () => {
        return network.category.getAll().then(setCategories);
    };

    const requestAllSubcategories = () => {
        categories.map((c) => c.id).forEach((id) => requestSubcategories(id));
    };

    const requestSubcategories = (id: number) => {
        return network.subcategory.getAll({ categoryId: id }).then((r) => {
            saveSubcategory(id, r);
        });
    };

    return (
        <Wrapper>
            {categoryModal && (
                <Modal onClose={() => setCategoryModal(false)}>
                    <CategoryModal
                        onSubmit={({ name }) => {
                            network.category
                                .create({ name })
                                .then(() => {
                                    setCategoryModal(false);
                                    requestCategories();
                                })
                                .catch(() => {
                                    showErrorToast(
                                        'Название должно быть уникальным'
                                    );
                                });
                        }}
                    />
                </Modal>
            )}

            {subcategoryModal && (
                <Modal onClose={() => setSubcategoryModal(false)}>
                    <SubcategoryModal
                        categories={categories}
                        category={selectedCategory || 0}
                        onSubmit={({ id, name }) => {
                            network.subcategory
                                .create({ categoryId: id, name })
                                .then(() => {
                                    setSubcategoryModal(false);
                                    requestCategories();
                                    requestAllSubcategories();
                                })
                                .catch(() => {
                                    showErrorToast(
                                        'Название должно быть уникальным'
                                    );
                                });
                        }}
                    />
                </Modal>
            )}

            {confirm && (
                <Modal onClose={() => setConfirm(false)}>
                    <Paper sx={{ padding: 3 }}>
                        <Txt variant="h6" sx={{ marginBottom: '64px' }}>
                            Подтвердите удаление категории
                        </Txt>
                        <Row>
                            <Button
                                color="red"
                                title="Удалить"
                                onClick={() => {
                                    deleteCategory(deleteCategoryId);
                                }}
                            >
                                удалить
                            </Button>
                            <Button title="Отменить"></Button>
                        </Row>
                    </Paper>
                </Modal>
            )}

            {confirmSub && (
                <Modal onClose={() => setConfirmSub(false)}>
                    <Paper sx={{ padding: 3 }}>
                        <Txt variant="h6" sx={{ marginBottom: '64px' }}>
                            Подтвердите удаление подкатегории
                        </Txt>
                        <Row>
                            <Button
                                color="red"
                                title="Удалить"
                                onClick={() => {
                                    deleteSubcategory(deleteSubcategoryId);
                                }}
                            >
                                удалить
                            </Button>
                            <Button title="Отменить"></Button>
                        </Row>
                    </Paper>
                </Modal>
            )}

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
                        {categories.map((category) => {
                            return (
                                <>
                                    <CategoryDiv>
                                        <CategoryTitle>
                                            {category.name}
                                        </CategoryTitle>
                                        <IconButton>
                                            <AiOutlineClose
                                                size={24}
                                                onClick={() => {
                                                    setDeleteCategoryId(
                                                        category.id
                                                    );
                                                    setConfirm(true);
                                                }}
                                            />
                                        </IconButton>
                                    </CategoryDiv>
                                    <SubCategoriesWrapper>
                                        {subcategories[category.id] &&
                                            subcategories[category.id].map(
                                                (subcategory) => (
                                                    <CategoryDiv
                                                        key={subcategory.id}
                                                    >
                                                        <CategoryTitle>
                                                            {subcategory.name}
                                                        </CategoryTitle>
                                                        <IconButton>
                                                            <AiOutlineClose
                                                                size={24}
                                                                onClick={() => {
                                                                    setDeleteSubcategoryId(
                                                                        subcategory.id
                                                                    );
                                                                    setConfirmSub(
                                                                        true
                                                                    );
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </CategoryDiv>
                                                )
                                            )}
                                        <Button
                                            height="large"
                                            width="wide"
                                            title="Добавить подкатегорию"
                                            onClick={() => {
                                                setSelectedCategory(
                                                    category.id
                                                );

                                                setSubcategoryModal(true);
                                            }}
                                        />
                                    </SubCategoriesWrapper>
                                </>
                            );
                        })}
                        <Button
                            height="large"
                            width="wide"
                            title="Добавить категорию"
                            onClick={() => setCategoryModal(true)}
                        />
                    </CategoryWrapper>
                </CategoriesWrapper>
                <ToastContainer />
            </PageWrapper>
        </Wrapper>
    );
};

export default Categories;
