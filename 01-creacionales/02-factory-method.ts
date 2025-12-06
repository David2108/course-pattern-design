/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

interface Hamburger {
    prepare(): void;
}

class ChickerHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparing Chicken Hamburger");
    }
}

class BeefHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparing Beef Hamburger");
    }
}

class BeanHamburger implements Hamburger {
    prepare(): void {
        console.log("Preparing Bean Hamburger");
    }
}

abstract class Restaurant {

    protected abstract createHamburger(): Hamburger;

    orderHamburger(): void {
        const hambuerger = this.createHamburger();
        hambuerger.prepare();
    }

}

class ChickenRestaurant extends Restaurant {
    
    override createHamburger(): Hamburger {
        return new ChickerHamburger();
    }

}

class BeefRestaurant extends Restaurant {
    
    override createHamburger(): Hamburger {
        return new BeefHamburger();
    }

}

class BeanRestaurant extends Restaurant {
    
    override createHamburger(): Hamburger {
        return new BeanHamburger();
    }

}

function factoryMethodDemo() {

    let restaurant: Restaurant;

    const burgerType = prompt("Which burger would you like? (chicken/beef/bean)")?.toLowerCase();

    switch (burgerType) {
        case "chicken":
            restaurant = new ChickenRestaurant();
            break;
        case "beef":
            restaurant = new BeefRestaurant();
            break;
        case "bean":
            restaurant = new BeanRestaurant();  
            break;
        default:
            console.error("Sorry, we don't have that type of burger.");
            return;
    } 

    restaurant.orderHamburger();

}


factoryMethodDemo();