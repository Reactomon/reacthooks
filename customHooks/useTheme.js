import { useState, useContext, createContext, useMemo, useCallback, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const ThemeContext = createContext();
const ThemeContextProvider = ThemeContext.Provider;

const CustomThemeProvider = props => {
    const { defaultTheme } = props;
    const [theme, setTheme] = useState(defaultTheme ? 'dark' : 'light');

    const value = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);

    return <ThemeContextProvider value={value} {...props}></ThemeContextProvider>
}

const useThemeProvider = () => {
    const context = useContext(ThemeContext);
    const {
        theme, setTheme,
    } = context;

    const getTheme = useCallback(() => theme, [theme]);

    const setNewTheme = useCallback((theme) => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }, [setTheme, theme]);

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return {
        getTheme,
        setNewTheme,
    };
}

const App = () => {
    const [theme, setTheme] = useState(null);
    const {
        getTheme,
    } = useThemeProvider();
    useEffect(() => {
        const newTheme = createMuiTheme({
            palette: {
                type: getTheme(),
                primary: { main: retrievedTheme.primary },
                secondary: { main: retrievedTheme.secondary },
                error: { main: retrievedTheme.error },
            },
            overrides: {
                MuiButton: {
                    root: {
                        borderRadius: retrievedTheme.roundedCorners,
                    },
                },
            },
        });
        setTheme(newTheme);
    }, [getTheme(), retrievedTheme]);

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}