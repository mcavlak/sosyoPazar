import { createTheme, ThemeProvider } from '@mui/material/styles';


const CustomThemeProvider = ({ children }) => {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#5E503F",
                contrastText: "#F2F4F3"
            },
            secondary: {
                main: '#D4C8BE',
                contrastText: "#5E503F"

            },
            background: {
                default: "#F5F5F5",
            }
        },
    })

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )

}

export default CustomThemeProvider;