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
    id: number;
    title: string;
    limit?: number;
    onKick: (id: number) => void;
    onUnlimited: (id: number) => void;
    onSetLimit: (id: number, limit: number) => void;
    onLimitChange: (id: number, limit?: number) => void;
};

export function MemberCard(props: Props) {
    const { id, title, limit, onKick, onUnlimited, onSetLimit, onLimitChange } =
        props;

    return (
        <Member>
            <MemberTitle>{title}</MemberTitle>
            <Limit>
                <Input
                    label="Лимит трат"
                    type="number"
                    value={limit ? String(limit) : ''}
                    onKeyDown={(e) => {
                        const good = [
                            '0',
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            'Backspace',
                        ];
                        if (!good.includes(e.key)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                    onChange={(e) => {
                        const limit = Number(e.target.value);
                        if (!Number.isNaN(limit)) {
                            onLimitChange(id, limit);
                        }
                        onLimitChange(id, limit);
                    }}
                />
                <LimitButtons>
                    <Button
                        color="green"
                        height="large"
                        width="content"
                        title="Безлимит"
                        onClick={() => onUnlimited(id)}
                    />
                    <Button
                        color="green"
                        height="large"
                        width="content"
                        title="Утвердить"
                        onClick={() => {
                            if (limit != null) {
                                onSetLimit(id, limit);
                            }
                        }}
                    />
                </LimitButtons>
            </Limit>
            <MemberActions>
                <Button
                    color="red"
                    height="large"
                    width="content"
                    title="Выгнать"
                    onClick={() => onKick(id)}
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
