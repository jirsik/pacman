class Entity {
    constructor(xpos, ypos, type) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.type = type;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = `entity entity--${this.type}`;
        this.element.style.left = `${this.xpos * TILE_SIZE}px`;
        this.element.style.top = `${this.ypos * TILE_SIZE}px`;     
    }

    mount(parent) {
        this.render();
        parent.element.appendChild(this.element);
        parent.entityArray.push(this);
    }

    unMount(entityArray) {
        this.element.parentNode.removeChild(this.element);
        const indexArrRemove = entityArray.indexOf(this);
        entityArray.splice(indexArrRemove,1);
    }
}