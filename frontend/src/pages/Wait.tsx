import { useEffect } from 'react';
import { network } from '../services/network/network';
import { useNavigate } from 'react-router-dom';

export function Wait() {
    const nav = useNavigate();

    useEffect(() => {
        network.auth.accepted().then((accepted) => {
            if (accepted) {
                nav('/');
            }
        });
    }, [nav]);
    return (
        <div>
            <h1>Wait</h1>
        </div>
    );
}
