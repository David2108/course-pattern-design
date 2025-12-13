/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  public balls: number = 0;
  private ballsCollected: number;

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!this.instance) {
      this.instance = new DragonBalls();
      console.log("Las esferas del Dragón han sido creadas!");
    }
    return this.instance;
  }

  collectBall() {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        `Has recogido una esfera del Dragón. Esferas recogidas: ${this.ballsCollected}`
      );
      return;
    }
    console.log("¡Ya has recogido las 7 esferas del Dragón!");
  }

  summonShenlong() {
    if (this.ballsCollected === 7) {
      console.log("¡Has invocado a Shenlong! Pide tu deseo.");
      this.ballsCollected = 0; // Reset after summoning
      return;
    }

    console.log(`Te faltan ${7 - this.ballsCollected} esferas del Dragón para invocar a Shenlong.`);
  }
}

function singlentonMain() {

    const gokuDragonBalls = DragonBalls.getInstance();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();

    gokuDragonBalls.summonShenlong();

    const vegetaDragonBalls = DragonBalls.getInstance();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    
    vegetaDragonBalls.summonShenlong();
}

singlentonMain();