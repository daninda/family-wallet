import styled from '@emotion/styled';
import { Typography, TypographyProps } from '@mui/material';

export const Row = styled.div({
    flexDirection: 'row',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
});

export const Column = styled.div({
    flexDirection: 'column',
    display: 'flex',
    gap: '1rem',
});

export const Txt = (props: TypographyProps) => {
    return <Typography variant="caption" {...props}></Typography>;
};
