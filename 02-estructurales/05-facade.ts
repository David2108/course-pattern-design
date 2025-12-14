/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Projector {
  turnOn() {
    console.log("Proyector encendido");
  }

  turnOff() {
    console.log("Proyector apagado");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }
  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Reproductor de video encendido");
  }
  off() {
    console.log("Reproductor de video apagado");
  }
  play(movie: string) {
    console.log(`Reproduciendo película: ${movie}`);
  }
  stop() {
    console.log("Película detenida");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Palomitas hechas");
  }
  turnOffPoppingPopcorn() {
    console.log("Palomitas apagadas");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log("Preparando para ver una película...");
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("¡Disfruta de la película!");
  }

  endWatchingMovie(): void {
    console.log("Apagando el cine en casa...");
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    
    console.log("Cine en casa apagado.");
  }
}

function main() {

    const movie = "Inception";
    const homeTheaterFacade = new HomeTheaterFacade({
      projector: new Projector(),
      soundSystem: new SoundSystem(),
      videoPlayer: new VideoPlayer(),
      popcornMaker: new PopcornMaker(),
    });

    homeTheaterFacade.watchMovie(movie);

    console.log("\n--- Después de un rato ---\n");

    homeTheaterFacade.endWatchingMovie();
}

main();