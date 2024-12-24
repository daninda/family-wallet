import { Wrapper } from '../../components/wrappers/Wrapper';
import styled from '@emotion/styled';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { network } from '../../services/network/network';
import { MemberCard } from './MemberCard';
import { User } from '../../models/auth';
import { RequestCard } from './RequestCard';

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

export function Members() {
    const navigate = useNavigate();

    const [familyCode, setFamilyCode] = useState(-1);
    const [joinRequests, setJoinRequests] = useState<User[]>([]);
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        network.member.familyCode().then(setFamilyCode);
        network.member.joinRequests().then(setJoinRequests);
        network.member.familyMembers().then(setMembers);
    }, []);

    const acceptUser = (userId: number) => {
        network.member.acceptRequest(userId).then(() => {
            network.member.joinRequests().then(setJoinRequests);
        });
    };

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
                        <Input
                            label="Код семьи"
                            value={familyCode.toString()}
                            disabled
                        />
                        <Button
                            color="green"
                            height="large"
                            width="content"
                            title="Копировать"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    familyCode.toString()
                                )
                            }
                        />
                    </CodeTool>
                </Tools>
                {members && members.length > 0 && (
                    <SectionTitle>Список участников</SectionTitle>
                )}
                {(members || []).map((user) => (
                    <MemberCard key={user.id} title={user.name} />
                ))}

                {joinRequests && joinRequests.length > 0 && (
                    <SectionTitle>Ожидающие подтверждения</SectionTitle>
                )}
                {(joinRequests || []).map((user) => (
                    <RequestCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        onClick={(id) => acceptUser(id)}
                    />
                ))}
            </PageWrapper>
        </Wrapper>
    );
}

export default Members;
