export type CoffeeImageSource = number | undefined;

// Add local require(...) values here as photographs become available.
// Example: espresso: require('@/assets/images/coffee/espresso.jpg')
export const coffeeImages: Record<string, CoffeeImageSource> = {
  espresso: require('../assets/images/coffee/espresso.png'), doubleEspresso: require('../assets/images/coffee/doubleEspresso.png'), americano: require('../assets/images/coffee/americano.png'), cappuccino: require('../assets/images/coffee/cappuccino.png'),
  latte: require('../assets/images/coffee/latte.png'), flatWhite: require('../assets/images/coffee/flatWhite.png'), macchiato: require('../assets/images/coffee/macchiato.png'), mocha: require('../assets/images/coffee/mocha.png'),
  cortado: require('../assets/images/coffee/cortado.png'), ristretto: require('../assets/images/coffee/ristretto.png'), lungo: require('../assets/images/coffee/lungo.png'), affogato: require('../assets/images/coffee/affogato.png'),
  icedLatte: require('../assets/images/coffee/icedLatte.png'), icedAmericano: require('../assets/images/coffee/icedAmericano.png'), icedMocha: require('../assets/images/coffee/icedMocha.png'), caramelLatte: require('../assets/images/coffee/caramelLatte.png'),
  vanillaLatte: require('../assets/images/coffee/vanillaLatte.png'), coldBrew: require('../assets/images/coffee/coldBrew.png'), vanillaColdBrew: require('../assets/images/coffee/vanillaColdBrew.png'), vietnameseIced: require('../assets/images/coffee/vietnameseIced.png'),
  dalgona: require('../assets/images/coffee/dalgona.png'), frenchPress: require('../assets/images/coffee/french-press.png'), pourOver: require('../assets/images/coffee/pourOver.png'), espressoTonic: require('../assets/images/coffee/espressoTonic.png'),
};
