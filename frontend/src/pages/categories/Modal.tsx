import { Paper } from '@mui/material';

interface Props {
    onClose: () => void;
    children: JSX.Element;
}

export function Modal(props: Props) {
    return (
        <Paper
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => {
                props.onClose();
            }}
        >
            {props.children}
        </Paper>
    );
}
