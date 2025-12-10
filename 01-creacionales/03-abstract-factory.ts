/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hambuerger {
    prepare(): void;
}

interface Drink {
    pour(): void;
}

class ChickenHambuerger implements Hambuerger {

    prepare(): void {
        console.log('Preparando una hamburguesa de pollo');
    }

}

class BeefHambuerger implements Hambuerger {

    prepare(): void {
        console.log('Preparando una hamburguesa de res');
    }

}

class Water implements Drink {

    pour(): void {
        console.log('Sirviendo agua');  
    }

}

class Soda implements Drink {

    pour(): void {
        console.log('Sirviendo refresco');
    }

}

interface RestaurantFactory {
    createHambuerger(): Hambuerger;
    createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {

    createHambuerger(): Hambuerger {
        return new BeefHambuerger();
    }

    createDrink(): Drink {
        return new Soda();
    }

}

class HealthyRestaurantFactory implements RestaurantFactory {

    createHambuerger(): Hambuerger {
        return new ChickenHambuerger();
    }

    createDrink(): Drink {
        return new Water();
    }

}

function abstractFactoryMain(factory: RestaurantFactory) {

    const hamburger = factory.createHambuerger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();

}

console.log('Pedido en restaurante de comida rápida:');

abstractFactoryMain(new FastFoodRestaurantFactory());