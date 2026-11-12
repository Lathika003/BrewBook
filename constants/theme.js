export const lightColors = {
    espresso: '#34251D', brown: '#79533D', caramel: '#C6A98B', cream: '#F5EBDD',
    white: '#FFFFFF', muted: '#8C8179', charcoal: '#24201D', sand: '#E8D8C5',
    pale: '#FBF7F1', success: '#63745B', danger: '#A75448', line: '#E3D6C8',
    surface: '#FFFFFF', onAccent: '#FFFFFF', onDanger: '#FFFFFF',
    imageText: '#FFFFFF', imageMuted: '#E8D8C5', overlaySurface: 'rgba(255,255,255,.93)',
    gradientStart: '#34251D',
};
export const darkColors = {
    ...lightColors,
    espresso: '#E2BE9C', brown: '#D2AF91', caramel: '#BFA080', cream: '#181411',
    muted: '#B4A69A', charcoal: '#F4EBE2', sand: '#3A2C23', pale: '#2D241E',
    success: '#A5BC98', danger: '#EF9D90', line: '#493B31', surface: '#251E19',
    onAccent: '#281C13', onDanger: '#341812', overlaySurface: 'rgba(37,30,25,.96)',
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
