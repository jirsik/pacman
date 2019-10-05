class Stage {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.entityArray = [];
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'stage';
        this.element.style.width = `${this.width * TILE_SIZE}px`;
        this.element.style.height = `${this.height * TILE_SIZE}px`;
    }

    mount(parent) {
        this.render();
        parent.appendChild(this.element);
    }

    collisionDetection(x,y){
        let result = null;
        for (const entity of this.entityArray) {
            if(x === entity.xpos && y === entity.ypos){
                result = entity;
            }
        }
        return result;
    }

    removeEntity(entityInfo) {
        entityInfo.unMount(this.entityArray);
    }

}