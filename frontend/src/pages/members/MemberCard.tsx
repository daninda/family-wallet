import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import styled from '@emotion/styled';
export const MembersWrapper = styled.div`
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

type Props = {
    title: string;
};

export function MemberCard(props: Props) {
    const { title } = props;

    return (
        <Member>
            <MemberTitle>{title}</MemberTitle>
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
    );
}
