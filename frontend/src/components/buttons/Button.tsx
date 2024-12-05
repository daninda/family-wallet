import styled from '@emotion/styled';
import { FC } from 'react';

const StyledButton = styled.button<{
  disabled: boolean;
  isRed: boolean;
  isWide: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ disabled, theme }) =>
    disabled ? '#fff' : theme.colors.background};
  background-color: ${({ disabled, isRed, theme }) =>
    disabled ? '#0070f3' : isRed ? theme.colors.error : theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ isWide }) => (isWide ? '100%' : 'auto')};
`;

interface Props {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  isRed?: boolean;
  isWide?: boolean;
}

const Button: FC<Props> = ({
  disabled = false,
  title,
  onClick,
  isRed = false,
  isWide = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      isRed={isRed}
      isWide={isWide}
    >
      {title}
    </StyledButton>
  );
};

export default Button;
