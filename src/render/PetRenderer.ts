import { Container, Graphics } from "pixi.js";
import type { PetState } from "../pet/PetModel";

const colorByMood: Record<PetState["animationState"], number> = {
  idle: 0xa6dcef,
  happy: 0x9ded88,
  sad: 0xef8d8d,
  sleep: 0x928de8,
  eat: 0xffd166
};

export class PetRenderer {
  readonly container = new Container();
  private readonly body = new Graphics();
  private readonly face = new Graphics();
  readonly miniGameTarget = new Graphics();

  constructor() {
    this.container.position.set(400, 260);
    this.container.addChild(this.body, this.face);

    this.miniGameTarget.eventMode = "static";
    this.miniGameTarget.cursor = "pointer";
    this.miniGameTarget.visible = false;

    this.drawPet("idle", "egg");
  }

  async loadTextures(): Promise<void> {
    return Promise.resolve();
  }

  update(state: PetState): void {
    this.drawPet(state.animationState, state.stage);
    this.renderMiniGameTarget(state);
  }

  private drawPet(mood: PetState["animationState"], stage: PetState["stage"]): void {
    const scaleByStage = {
      egg: 0.7,
      baby: 0.9,
      adult: 1.1
    } as const;

    const scale = scaleByStage[stage];

    this.body.clear();
    this.body.circle(0, 0, 90 * scale).fill(colorByMood[mood]);

    this.face.clear();
    if (mood === "sleep") {
      this.face.moveTo(-35 * scale, -15 * scale).lineTo(-15 * scale, -15 * scale);
      this.face.moveTo(15 * scale, -15 * scale).lineTo(35 * scale, -15 * scale);
      this.face.stroke({ color: 0x111111, width: 6 });
    } else {
      this.face.circle(-25 * scale, -15 * scale, 8 * scale).fill(0x111111);
      this.face.circle(25 * scale, -15 * scale, 8 * scale).fill(0x111111);
    }

    this.face.moveTo(-25 * scale, 30 * scale);
    if (mood === "happy" || mood === "eat") {
      this.face.quadraticCurveTo(0, 55 * scale, 25 * scale, 30 * scale);
    } else if (mood === "sad") {
      this.face.quadraticCurveTo(0, 10 * scale, 25 * scale, 30 * scale);
    } else {
      this.face.lineTo(25 * scale, 30 * scale);
    }
    this.face.stroke({ color: 0x111111, width: 6 * scale });
  }

  private renderMiniGameTarget(state: PetState): void {
    this.miniGameTarget.clear();
    this.miniGameTarget.visible = state.miniGame.active;

    if (!state.miniGame.active) {
      return;
    }

    this.miniGameTarget.circle(0, 0, 18).fill(0xff4d6d);
    this.miniGameTarget.position.set(state.miniGame.targetX, state.miniGame.targetY);
  }
}
