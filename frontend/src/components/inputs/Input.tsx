import styled from '@emotion/styled';
import { FC } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
`;

const Error = styled.span`
  font-size: 12px;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : 'black')};
  border-radius: 4px;
  font-size: 14px;
  outline: none;
`;

interface Props {
  label: string;
  error?: string;
}

const Input: FC<Props> = ({ label, error }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledInput hasError={!!error} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default Input;
