class Robot {
    constructor(stage, pacman, x, y) {
      this.xpos = x; //stage.width - 2;
      this.ypos = y; //stage.height - 2;
      this.x;
      this.y;
      this.found = false;
      this.way = [];
      this.blindArray = [];
      this.timer;

      this.stage = stage;
      this.pacman = pacman;

    }
  
    render() {
      this.element = document.createElement("div");
      this.element.className = "entity robot";
      
      // this.element.addEventListener('click', () => { 
      //   this.move();   
      // });
    }
  
    mount() {
      this.render();
      this.stage.element.appendChild(this.element);
      this.update();
      setTimeout(() => {this.timer = setInterval(()=> this.move(), ROBOT_SPEED );}, 1000);
    }
    
    isOutOfStage(x, y) {
      if (x < 0 || y < 0 || x > this.stage.width - 1 || y > this.stage.height - 1) {
        return true;
      }
      return false;
    }
    
    isWall(x, y) {
      for (const wall of this.stage.wallArray) {
        if (wall.xpos === x && wall.ypos === y) {
          return true;
        }
      }
      return false;
    }

    isBlind(x, y) {
      for (const blind of this.blindArray) {
        if (blind[0] === x && blind[1] === y) {
          return true;
        }
      }
      return false;
    }

    isOnMyPath(x, y) {
      if (this.way.length >= 2) {
        if (this.way[this.way.length - 2][0] === x && this.way[this.way.length - 2][1] === y) {
          return true;
        }  
      }
      return false;
    }

    whereToGo() {
        let optionsToTake = [];
        let newX = this.x + 1;
        let newY = this.y;
        if (!this.isOutOfStage(newX, newY) && !this.isWall(newX, newY) && !this.isBlind(newX, newY) && !this.isOnMyPath(newX, newY)) {
          optionsToTake.push([newX, newY]);
        }
        newX = this.x;
        newY = this.y - 1;
        if (!this.isOutOfStage(newX, newY) && !this.isWall(newX, newY) && !this.isBlind(newX, newY) && !this.isOnMyPath(newX, newY)) {
          optionsToTake.push([newX, newY]);
        }
        newX = this.x - 1;
        newY = this.y;
        if (!this.isOutOfStage(newX, newY) && !this.isWall(newX, newY) && !this.isBlind(newX, newY) && !this.isOnMyPath(newX, newY)) {
          optionsToTake.push([newX, newY]);
        }
        newX = this.x;
        newY = this.y + 1;
        if (!this.isOutOfStage(newX, newY) && !this.isWall(newX, newY) && !this.isBlind(newX, newY) && !this.isOnMyPath(newX, newY)) {
          optionsToTake.push([newX, newY]);
        }
        return optionsToTake;
    }

    findPacman() {
        this.found = false;
        this.blindArray = [];
        this.way = [];
        this.x = this.xpos;
        this.y = this.ypos;
        this.way.push([this.x, this.y]);
        while (!this.found) {
        // for (let i = 0; i<50; i++) {
          let options = this.whereToGo();
          // console.log('mozosti' + options);
          if (options.length === 0) {
              this.blindArray.push([this.x, this.y]);
              this.way.pop();
              this.x = this.way[this.way.length - 1][0];
              this.y = this.way[this.way.length - 1][1];

              // console.log('vracím se na' + this.x + this.y);
          } else {
              this.x = options[0][0];
              this.y = options[0][1];
              this.way.push([this.x, this.y]);

              // console.log('jdu na' + options[0][0] + options[0][1]);
              // console.log('myway' + this.way);
          }
          if (this.x === this.pacman.xpos && this.y === this.pacman.ypos) {
            this.found = true;
            // console.log('found him');
            //clearInterval(this.timer);
            
          }
        }
    }

    killPacman() {
      if (this.pacman.score === 0) {
        this.pacman.element.className = "entity entity--pac entity--tomb";
        this.pacman.death = true;
        this.element.style.display = 'none';
      } else {
        this.pacman.score--;
        this.pacman.update();
      }
    }

    move() {
        if (this.pacman.death) {
          clearInterval(this.timer);
        } else if (this.xpos !== this.pacman.xpos || this.ypos !== this.pacman.ypos) {
          this.findPacman();
          this.xpos = this.way[1][0];
          this.ypos = this.way[1][1];
          this.update();
        }
        if (this.xpos === this.pacman.xpos && this.ypos === this.pacman.ypos) {
          this.killPacman();
        }
    }

    update() {
      this.element.style.left = `${this.xpos * TILE_SIZE}px`;
      this.element.style.top = `${this.ypos * TILE_SIZE}px`;
    }
  }
  