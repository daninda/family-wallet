import styled from '@emotion/styled';
import { FC } from 'react';

const StyledButton = styled.button<{
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ disabled, theme }) =>
    disabled ? '#fff' : theme.colors.background};
  background-color: ${({ disabled, theme }) =>
    disabled ? '#0070f3' : theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

interface Props {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}

const Button: FC<Props> = ({ disabled = false, title, onClick }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {title}
    </StyledButton>
  );
};

export default Button;
