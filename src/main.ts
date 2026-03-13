import { Application } from "pixi.js";
import { Game } from "./core/Game";

async function bootstrap(): Promise<void> {
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x222222,
    antialias: true
  });

  document.body.appendChild(app.canvas);

  const game = new Game(app);
  await game.start();
}

void bootstrap();
