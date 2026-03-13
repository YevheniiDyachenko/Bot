export type EvolutionStage = "egg" | "baby" | "adult";

export interface Inventory {
  food: number;
  toys: number;
  medicine: number;
}

export interface MiniGameState {
  active: boolean;
  timeLeft: number;
  score: number;
  targetX: number;
  targetY: number;
}

export interface PetState {
  hunger: number;
  energy: number;
  happiness: number;
  health: number;
  age: number;
  stage: EvolutionStage;
  inventory: Inventory;
  miniGame: MiniGameState;
  animationState: "idle" | "happy" | "sad" | "sleep" | "eat";
  animationTimer: number;
  lastUpdate: number;
}

export const createInitialPetState = (): PetState => ({
  hunger: 40,
  energy: 80,
  happiness: 70,
  health: 100,
  age: 0,
  stage: "egg",
  inventory: {
    food: 5,
    toys: 3,
    medicine: 2
  },
  miniGame: {
    active: false,
    timeLeft: 0,
    score: 0,
    targetX: 400,
    targetY: 260
  },
  animationState: "idle",
  animationTimer: 0,
  lastUpdate: Date.now()
});
