import { PetState, createInitialPetState } from "../pet/PetModel";

const STORAGE_KEY = "tamagotchi";

export class SaveManager {
  save(state: PetState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  load(): PetState {
    const save = localStorage.getItem(STORAGE_KEY);
    if (!save) {
      return createInitialPetState();
    }

    try {
      const parsed = JSON.parse(save) as PetState;
      return {
        ...createInitialPetState(),
        ...parsed,
        lastUpdate: typeof parsed.lastUpdate === "number" ? parsed.lastUpdate : Date.now()
      };
    } catch {
      return createInitialPetState();
    }
  }
}
