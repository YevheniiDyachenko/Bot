import type { EvolutionStage, PetState } from "./PetModel";

export class PetLogic {
  constructor(private readonly pet: PetState) {}

  update(deltaSeconds: number): void {
    this.pet.hunger += deltaSeconds * 2;
    this.pet.energy -= deltaSeconds * 1;
    this.pet.happiness -= deltaSeconds * 0.5;
    this.pet.age += deltaSeconds;

    if (this.pet.hunger > 80) {
      this.pet.health -= 5 * deltaSeconds;
    }

    if (this.pet.energy < 10) {
      this.pet.happiness -= 5 * deltaSeconds;
    }

    this.updateEvolution();
    this.updateMiniGame(deltaSeconds);
    this.updateAnimation(deltaSeconds);
    this.clampValues();
    this.pet.lastUpdate = Date.now();
  }

  applyOfflineProgress(elapsedSeconds: number): void {
    if (elapsedSeconds <= 0) {
      return;
    }
    this.update(elapsedSeconds);
  }

  feed(): void {
    if (this.pet.inventory.food <= 0) {
      return;
    }

    this.pet.inventory.food -= 1;
    this.pet.hunger -= 30;
    this.pet.happiness += 5;
    this.setAnimation("eat", 1.2);
    this.clampValues();
  }

  play(): void {
    if (this.pet.inventory.toys <= 0) {
      return;
    }

    this.pet.inventory.toys -= 1;
    this.pet.energy -= 15;
    this.pet.happiness += 20;
    this.clampValues();
  }

  sleep(): void {
    this.pet.energy += 40;
    this.setAnimation("sleep", 1.6);
    this.clampValues();
  }

  heal(): void {
    if (this.pet.inventory.medicine <= 0) {
      return;
    }

    this.pet.inventory.medicine -= 1;
    this.pet.health += 25;
    this.clampValues();
  }

  startMiniGame(): void {
    if (this.pet.miniGame.active) {
      return;
    }

    this.pet.miniGame.active = true;
    this.pet.miniGame.timeLeft = 10;
    this.pet.miniGame.score = 0;
    this.randomizeMiniGameTarget();
  }

  tapMiniGameTarget(): void {
    if (!this.pet.miniGame.active) {
      return;
    }

    this.pet.miniGame.score += 1;
    this.pet.happiness += 4;
    this.pet.energy -= 2;
    this.randomizeMiniGameTarget();
    this.clampValues();
  }

  private updateMiniGame(deltaSeconds: number): void {
    if (!this.pet.miniGame.active) {
      return;
    }

    this.pet.miniGame.timeLeft -= deltaSeconds;

    if (this.pet.miniGame.timeLeft <= 0) {
      const reward = Math.floor(this.pet.miniGame.score / 3);
      this.pet.inventory.food += reward;
      this.pet.inventory.toys += reward > 0 ? 1 : 0;
      this.pet.miniGame.active = false;
      this.pet.miniGame.timeLeft = 0;
    }
  }

  private updateEvolution(): void {
    this.pet.stage = resolveStage(this.pet.age);
  }

  private updateAnimation(deltaSeconds: number): void {
    if (this.pet.animationTimer > 0) {
      this.pet.animationTimer -= deltaSeconds;
      if (this.pet.animationTimer <= 0) {
        this.pet.animationState = "idle";
      }
      return;
    }

    if (this.pet.energy < 20) {
      this.pet.animationState = "sleep";
      return;
    }

    if (this.pet.hunger > 80) {
      this.pet.animationState = "sad";
      return;
    }

    if (this.pet.happiness > 70) {
      this.pet.animationState = "happy";
      return;
    }

    this.pet.animationState = "idle";
  }

  private setAnimation(state: PetState["animationState"], duration: number): void {
    this.pet.animationState = state;
    this.pet.animationTimer = duration;
  }

  private randomizeMiniGameTarget(): void {
    this.pet.miniGame.targetX = 260 + Math.random() * 280;
    this.pet.miniGame.targetY = 170 + Math.random() * 220;
  }

  private clampValues(): void {
    this.pet.hunger = clamp(this.pet.hunger);
    this.pet.energy = clamp(this.pet.energy);
    this.pet.happiness = clamp(this.pet.happiness);
    this.pet.health = clamp(this.pet.health);
  }
}

const clamp = (value: number): number => Math.max(0, Math.min(100, value));

const resolveStage = (ageSeconds: number): EvolutionStage => {
  if (ageSeconds < 60) {
    return "egg";
  }
  if (ageSeconds < 180) {
    return "baby";
  }
  return "adult";
};
