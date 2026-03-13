export class GameLoop {
  private lastTime = performance.now();

  update(callback: (delta: number) => void): void {
    const loop = (time: number): void => {
      const delta = (time - this.lastTime) / 1000;
      this.lastTime = time;

      callback(delta);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
