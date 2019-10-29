const TILE_SIZE = 85;
const ROBOT_SPEED = 500;

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  const stageX = 32; // 32max
  const stageY = 16; // 32max

  const stage = new Stage(stageX,stageY);
  stage.mount(app);

  const pacman = new Pacman(stage);
  pacman.mount(stage);

  fetch(`http://bootcamp.podlomar.org/api/pacman?width=${stageX}&height=${stageY}`)
    .then(response => response.json())
    .then(entityList => {
      for (const appleInfo of entityList.apples) {
        const apple = new Entity (appleInfo.x, appleInfo.y, 'apple')
        apple.mount(stage);
      }
      for (const wallInfo of entityList.walls) {
        const wall = new Entity (wallInfo.x, wallInfo.y, 'wall')
        wall.mount(stage);
      }
      for (const bombInfo of entityList.bombs) {
        const bomb = new Entity (bombInfo.x, bombInfo.y, 'bomb')
        bomb.mount(stage);
      }

    });

  const robot1 = new Robot(stage, pacman, stage.width - 2, stage.height - 2);
  robot1.mount();

  const robot2 = new Robot(stage, pacman, 0, stage.height - 2);
  robot2.mount();

  const robot3 = new Robot(stage, pacman, stage.width - 2, 0);
  robot3.mount();
  
  document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight'){
      pacman.move('right');
    }
    if(event.key === 'ArrowLeft'){
      pacman.move('left');
    }
    if(event.key === 'ArrowUp'){
      pacman.move('up');
    }
    if(event.key === 'ArrowDown'){
      pacman.move('down');
    }
  });
});
