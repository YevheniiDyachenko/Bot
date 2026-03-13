import { Container, Text } from "pixi.js";
import type { PetState } from "../pet/PetModel";

export class HUD {
  readonly container = new Container();
  private readonly statusText = new Text({
    text: "",
    style: {
      fill: "#ffffff",
      fontSize: 20,
      fontFamily: "Arial"
    }
  });

  constructor() {
    this.statusText.position.set(24, 24);
    this.container.addChild(this.statusText);
  }

  update(state: PetState): void {
    const miniGameStatus = state.miniGame.active
      ? `MiniGame: ON (${state.miniGame.timeLeft.toFixed(1)}s, score ${state.miniGame.score})`
      : `MiniGame: OFF (last score ${state.miniGame.score})`;

    this.statusText.text = [
      `Hunger: ${Math.round(state.hunger)}`,
      `Energy: ${Math.round(state.energy)}`,
      `Happiness: ${Math.round(state.happiness)}`,
      `Health: ${Math.round(state.health)}`,
      `Age: ${Math.floor(state.age)}s`,
      `Stage: ${state.stage}`,
      `Inventory → food:${state.inventory.food} toys:${state.inventory.toys} medicine:${state.inventory.medicine}`,
      miniGameStatus
    ].join("\n");
  }
}
