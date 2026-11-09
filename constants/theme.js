export const colors = {
    espresso: '#34251D', brown: '#79533D', caramel: '#C6A98B', cream: '#F5EBDD',
    white: '#FFFFFF', muted: '#8C8179', charcoal: '#24201D', sand: '#E8D8C5',
    pale: '#FBF7F1', success: '#63745B', danger: '#A75448', line: '#E3D6C8',
};
export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32, xxl: 44 };
export const radius = { sm: 10, md: 16, lg: 24, xl: 32, pill: 999 };
export const shadow = {
    card: { shadowColor: '#34251D', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 18, elevation: 3 },
};
export const fonts = {
    serif: process.env.EXPO_OS === 'ios' ? 'Georgia' : 'serif',
    sans: process.env.EXPO_OS === 'ios' ? 'System' : 'sans-serif',
    sansMedium: process.env.EXPO_OS === 'ios' ? 'System' : 'sans-serif-medium',
};
