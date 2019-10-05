const TILE_SIZE = 85;

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  const stageX = 32; // 32max
  const stageY = 32; // 32max

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
