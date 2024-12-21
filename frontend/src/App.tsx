import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import { ThemeProvider } from '@emotion/react';
import { main } from './themes';
import GlobalStyles from './themes/global';
import { network } from './services/network/network';

const App: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            network.auth.check({ token }).then((user) => {
                if (user != null) {
                    setIsAuth(true);
                    if (user.isAdmin) {
                        setIsAdmin(true);
                    }
                    setIsLoading(false);

                    console.log(user);
                }
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <ThemeProvider theme={main}>
            <GlobalStyles>
                <div className="global">
                    <BrowserRouter>
                        <Router
                            isLoading={isLoading}
                            isAuth={isAuth}
                            isAdmin={isAdmin}
                        />
                    </BrowserRouter>
                </div>
            </GlobalStyles>
        </ThemeProvider>
    );
};

export default App;
