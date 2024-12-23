import styled from '@emotion/styled';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

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

type Props = {
    id: number;
    name: string;
    onClick: (id: number) => void;
};

export function RequestCard(props: Props) {
    const { id, name, onClick } = props;
    return (
        <Candidat>
            <CandidatTitle>{name}</CandidatTitle>
            <CandidatActions>
                <IconButton>
                    <AiOutlineCheckCircle
                        size={32}
                        onClick={() => onClick(id)}
                    />
                </IconButton>
                <IconButton>
                    <AiOutlineCloseCircle size={32} />
                </IconButton>
            </CandidatActions>
        </Candidat>
    );
}
