import { FC } from 'react';
import { Wrapper } from '../../components/wrappers/Wrapper';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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

const CodeTool = styled.div`
    display: flex;
    align-items: center;
    column-gap: 12px;
    align-items: end;
`;

const SectionTitle = styled.h2`
    font-size: 16px;
    font-weight: 500;
`;

const MembersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-top: 16px;
    margin-bottom: 32px;
`;

const Member = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
`;

const MemberTitle = styled.h3`
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

const Limit = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
`;

const LimitButtons = styled.div`
    display: flex;
    column-gap: 16px;
    align-items: end;
`;

const MemberActions = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Candidat = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.divider};
`;

const CandidatTitle = styled.h3`
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
`;

const CandidatActions = styled.div`
    display: flex;
    column-gap: 16px;
`;

const IconButton = styled.button`
    border: none;
    height: 32px;
    background-color: transparent;
    cursor: pointer;
`;

const Members: FC = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <PageWrapper>
                <PageTitle>Участники</PageTitle>
                <Tools>
                    <Button
                        color="white"
                        height="large"
                        width="medium"
                        title="Назад"
                        onClick={() => navigate('/')}
                    />
                    <CodeTool>
                        <Input label="Код семьи" type="number" />
                        <Button
                            color="green"
                            height="large"
                            width="content"
                            title="Копировать"
                        />
                    </CodeTool>
                </Tools>
                <SectionTitle>Список участников</SectionTitle>
                <MembersWrapper>
                    <Member>
                        <MemberTitle>Иван Алексеев</MemberTitle>
                        <Limit>
                            <Input label="Лимит трат" type="number" />
                            <LimitButtons>
                                <Button
                                    color="green"
                                    height="large"
                                    width="content"
                                    title="Безлимит"
                                />
                                <Button
                                    color="green"
                                    height="large"
                                    width="content"
                                    title="Утвердить"
                                />
                            </LimitButtons>
                        </Limit>
                        <MemberActions>
                            <Button
                                color="red"
                                height="large"
                                width="content"
                                title="Выгнать"
                            />
                            <Button
                                color="green"
                                height="large"
                                width="content"
                                title="Посмотреть"
                            />
                        </MemberActions>
                    </Member>
                </MembersWrapper>
                <SectionTitle>Ожидающие подтверждения</SectionTitle>
                <MembersWrapper>
                    <Candidat>
                        <CandidatTitle>Салават Нурсафин</CandidatTitle>
                        <CandidatActions>
                            <IconButton>
                                <AiOutlineCheckCircle size={32} />
                            </IconButton>
                            <IconButton>
                                <AiOutlineCloseCircle size={32} />
                            </IconButton>
                        </CandidatActions>
                    </Candidat>
                </MembersWrapper>
            </PageWrapper>
        </Wrapper>
    );
};

export default Members;
