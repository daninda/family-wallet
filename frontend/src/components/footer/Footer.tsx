import { FC, useState } from 'react';
import { Wrapper } from '../wrappers/Wrapper';
import styled from '@emotion/styled';
import Modal from '../modals/Modal';

const BorderWrapper = styled.div`
    outline: 1px solid ${({ theme }) => theme.colors.divider};
`;

const FooterWrapper = styled.header`
    display: flex;
    height: 128px;
    align-items: start;
    padding-top: 16px;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 600;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: start;
    justify-content: right;
`;

const Button = styled.a`
    text-decoration: underline;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

    &:visited {
        color: ${({ theme }) => theme.colors.primaryText};
    }

    &:active {
        color: ${({ theme }) => theme.colors.primaryText};
    }
`;

const HelpWrapper = styled.div`
    display: flex;
    row-gap: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HelpTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
`;

const HelpParagraph = styled.p`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    margin: 8px 0;

    &:last-child {
        margin-top: 48px;
    }
`;

const Footer: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <BorderWrapper>
            <Wrapper>
                <FooterWrapper>
                    <Title>Семейная копилка</Title>
                    <Buttons>
                        <Button href="/help.html" target="_blank">
                            Справка
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)}>
                            О разработчиках
                        </Button>
                    </Buttons>
                </FooterWrapper>
            </Wrapper>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} width="large">
                    <HelpWrapper>
                        <HelpTitle>
                            Сведения о разработчиках Самарский университет
                        </HelpTitle>
                        <div>
                            <HelpParagraph>
                                Кафедра программных систем
                            </HelpParagraph>
                            <HelpParagraph>
                                Курсовой проект по дисциплине “Программная
                                инженерия”
                            </HelpParagraph>
                            <HelpParagraph>
                                Тема проекта: Сервис для учета финанса семьи
                            </HelpParagraph>
                            <HelpParagraph>
                                Руководитель: доцент кафедры П.С. Зеленко Л.С.
                            </HelpParagraph>
                            <HelpParagraph>Разработчики:</HelpParagraph>
                            <HelpParagraph
                                style={{
                                    textAlign: 'left',
                                    marginTop: '16px',
                                    marginLeft: '32px',
                                }}
                            >
                                - обучающийся группы 6401-020302D Гребенщиков Д.
                                А.
                            </HelpParagraph>
                            <HelpParagraph
                                style={{
                                    textAlign: 'left',
                                    marginLeft: '32px',
                                }}
                            >
                                - обучающийся группы 6403-020302D Нурсафин С. И.
                            </HelpParagraph>
                            <HelpParagraph>Самара 2024</HelpParagraph>
                        </div>
                    </HelpWrapper>
                </Modal>
            )}
        </BorderWrapper>
    );
};

export default Footer;
