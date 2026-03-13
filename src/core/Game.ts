import { Application } from "pixi.js";
import { GameLoop } from "./GameLoop";
import { PetLogic } from "../pet/PetLogic";
import { PetState } from "../pet/PetModel";
import { SaveManager } from "../storage/SaveManager";
import { PetRenderer } from "../render/PetRenderer";
import { HUD } from "../ui/HUD";
import { Buttons } from "../ui/Buttons";

export class Game {
  private readonly gameLoop = new GameLoop();
  private readonly saveManager = new SaveManager();
  private readonly petState: PetState = this.saveManager.load();
  private readonly petLogic = new PetLogic(this.petState);
  private readonly petRenderer = new PetRenderer();
  private readonly hud = new HUD();
  private readonly buttons = new Buttons([
    { label: "Feed", x: 20, y: 500, onClick: () => this.petLogic.feed() },
    { label: "Play", x: 140, y: 500, onClick: () => this.petLogic.play() },
    { label: "Sleep", x: 260, y: 500, onClick: () => this.petLogic.sleep() },
    { label: "Heal", x: 380, y: 500, onClick: () => this.petLogic.heal() },
    { label: "MiniGame", x: 500, y: 500, onClick: () => this.petLogic.startMiniGame() },
    { label: "Status", x: 660, y: 500, onClick: () => this.hud.update(this.petState) }
  ]);

  constructor(private readonly app: Application) {
    this.app.stage.addChild(this.petRenderer.container);
    this.app.stage.addChild(this.petRenderer.miniGameTarget);
    this.app.stage.addChild(this.hud.container);
    this.app.stage.addChild(this.buttons.container);

    this.petRenderer.miniGameTarget.on("pointertap", () => {
      this.petLogic.tapMiniGameTarget();
    });

    const now = Date.now();
    const delta = (now - this.petState.lastUpdate) / 1000;
    this.petLogic.applyOfflineProgress(delta);
  }

  async start(): Promise<void> {
    await this.petRenderer.loadTextures();
    this.tick(0);
    this.gameLoop.update((delta) => this.tick(delta));

    window.addEventListener("beforeunload", () => {
      this.saveManager.save(this.petState);
    });
  }

  private tick(delta: number): void {
    if (delta > 0) {
      this.petLogic.update(delta);
      this.saveManager.save(this.petState);
    }

    this.petRenderer.update(this.petState);
    this.hud.update(this.petState);
  }
}
