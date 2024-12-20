import styled from '@emotion/styled';
import { FC } from 'react';

const StyledButton = styled.button<{
  disabled: boolean;
  height: 'small' | 'medium' | 'large';
  color: 'green' | 'yellow' | 'red' | 'white';
  width?: 'content' | 'medium' | 'wide';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ disabled, color, theme }) =>
    disabled
      ? theme.colors.divider
      : color === 'yellow' || color === 'white'
        ? theme.colors.primaryText
        : theme.colors.background};
  background-color: ${({ disabled, color, theme }) =>
    disabled
      ? theme.colors.divider
      : color === 'red'
        ? theme.colors.error
        : color === 'yellow'
          ? theme.colors.accent
          : color === 'white'
            ? theme.colors.background
            : theme.colors.primary};
  border: ${({ color, theme }) =>
    color === 'white' ? '1px solid ' + theme.colors.divider : 'none'};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ width }) =>
    width === 'content' ? 'auto' : width === 'medium' ? '240px' : '100%'};
  height: ${({ height }) =>
    height === 'small' ? '32px' : height === 'medium' ? '36px' : '40px'};
`;

interface Props {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  isRed?: boolean;
  height?: 'small' | 'medium' | 'large';
  color?: 'green' | 'yellow' | 'red' | 'white';
  width?: 'content' | 'medium' | 'wide';
}

const Button: FC<Props> = ({
  disabled = false,
  title,
  onClick,
  width = 'content',
  height = 'medium',
  color = 'green',
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      height={height}
      color={color}
      width={width}
    >
      {title}
    </StyledButton>
  );
};

export default Button;
