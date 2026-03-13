import { Container, Graphics, Text } from "pixi.js";

type ButtonConfig = {
  label: string;
  x: number;
  y: number;
  onClick: () => void;
};

export class Buttons {
  readonly container = new Container();

  constructor(configs: ButtonConfig[]) {
    for (const config of configs) {
      const button = new Graphics().roundRect(0, 0, 110, 44, 10).fill(0x3d8bfd);
      button.position.set(config.x, config.y);
      button.eventMode = "static";
      button.cursor = "pointer";
      button.on("pointertap", config.onClick);

      const label = new Text({
        text: config.label,
        style: {
          fill: "#ffffff",
          fontSize: 16,
          fontFamily: "Arial"
        }
      });
      label.anchor.set(0.5);
      label.position.set(55, 22);

      button.addChild(label);
      this.container.addChild(button);
    }
  }
}
