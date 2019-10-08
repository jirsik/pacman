class Pacman {
  constructor(stage) {
    this.xpos = 0;
    this.ypos = 0;
    this.lastXpos = 0;
    this.lastYpos = 0;
    this.mouth = 0;
    this.direction = 'right';
    this.stage = stage;
    this.score = 0;
    this.death = false;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "entity entity--pac pacboy-active-light";
    this.element.innerHTML = `Pacman ${this.score}`;
  }

  mount(parent) {
    this.render();
    parent.element.appendChild(this.element);
    this.maxWidth = parent.width - 1;
    this.maxHeight = parent.height - 1;
    this.update();
  }

  move(direction) {
    if (!this.death) {
      this.lastXpos = this.xpos;
      this.lastYpos = this.ypos;
      switch (direction) {
        case "right":
          if (this.xpos < this.maxWidth) {
            this.xpos += 1;
          }
          this.direction = 0;
          break;
        case "left":
          if (this.xpos > 0) {
            this.xpos -= 1;
          }
          this.direction = 255;
          break;
        case "up":
          if (this.ypos > 0) {
            this.ypos -= 1;
          }
          this.direction = 85;
          break;
        case "down":
          if (this.ypos < this.maxHeight) {
            this.ypos += 1;
          }
          this.direction = 170;
          break;
      }
      const collisionDetectionResult = this.stage.collisionDetection(
        this.xpos,
        this.ypos
      );
      
      if (collisionDetectionResult !== null) {
        switch (collisionDetectionResult.type) {
          case "wall":
            this.xpos = this.lastXpos;
            this.ypos = this.lastYpos;
            break;
          case "apple":
            this.score++;
            this.stage.removeEntity(collisionDetectionResult);
            break;
          case "bomb":
            if (Math.random() < 0.5) {
              this.stage.removeEntity(collisionDetectionResult);
              this.element.className = "entity entity--pac entity--tomb";
              this.death = true;
            }
            break;
        }
      }

      if (this.mouth === 0) {
        this.mouth = 85;
      } else {
        this.mouth = 0;
      }
      this.update();
    }
  }

  update() {
    this.element.style.left = `${this.xpos * TILE_SIZE}px`;
    this.element.style.top = `${this.ypos * TILE_SIZE}px`;
    this.element.style.backgroundPositionX = `${this.mouth}px`;
    this.element.style.backgroundPositionY = `${this.direction}px`;
    this.element.innerHTML = `Pacman ${this.score}`;
  }
}
