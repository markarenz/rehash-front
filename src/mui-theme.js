import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: { main: '#ffff', dark: '#fff', light: '#fff', contrastText: '#333' },
    secondary: { main: '#ffff', dark: '#fff', light: '#fff', contrastText: '#333' },
};

const typography = {
    // "body1": {
    //     // "color": "#e6e6e6",
    //     // "fontFamily": "'Montserrat', helvetica, sans-serif",
    //     // "lineHeight": 1.3,
    //     // "fontSize": 18,
    //     // "fontWeight": 400,
    //     // "marginTop": 0,
    //     // "marginBottom": 16,
    // }
}
const overrides = {

};

const themeName = 'ReHash v1';

export default createMuiTheme({ overrides, palette, typography, themeName });
