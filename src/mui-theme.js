import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#ffff', dark: '#fff', light: '#fff', contrastText: '#333' },
    secondary: { main: '#ffff', dark: '#fff', light: '#fff', contrastText: '#333' },
};

const typography = {
}
const overrides = {
    MuiTooltip: {
        tooltip: {
            fontSize: 14,
        },
    },
};

const themeName = 'ReHash v1';

export default createMuiTheme({ overrides, palette, typography, themeName });
