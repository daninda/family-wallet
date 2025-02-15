import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import { ThemeProvider } from '@emotion/react';
import { main } from './themes';
import GlobalStyles from './themes/global';
import { network } from './services/network/network';
import { createTheme } from '@mui/material';
import { User } from './models/auth';

const App: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            network.auth.check({ token }).then(
                (user) => {
                    setIsAuth(true);
                    setUser(user);
                    setIsLoading(false);
                },
                () => {
                    setIsLoading(false);
                }
            );
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <ThemeProvider
            theme={{
                ...createTheme({
                    palette: {
                        primary: {
                            main: main.colors.primary,
                        },
                    },
                }),
                ...main,
            }}
        >
            <GlobalStyles>
                <div className="global">
                    <BrowserRouter>
                        <Router
                            isLoading={isLoading}
                            isAuth={isAuth}
                            user={user}
                        />
                    </BrowserRouter>
                </div>
            </GlobalStyles>
        </ThemeProvider>
    );
};

export default App;
