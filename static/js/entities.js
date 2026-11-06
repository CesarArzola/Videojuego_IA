class Player {
    constructor(x, y, race) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 4;
        
        // Aplicar stats de raza (Ej: Humanos por defecto)
        this.maxHp = race.hp || 100;
        this.hp = this.maxHp;
        this.maxMp = race.mp || 50;
        this.mp = this.maxMp;
        this.maxSp = race.sp || 80;
        this.sp = this.maxSp;
        
        this.inventory = new Inventory(40);
    }

    update(keys, world) {
        if (this.inventory.isOpen) return; // No mover si el inventario está abierto

        let dx = 0;
        let dy = 0;

        if (keys['w']) dy -= this.speed;
        if (keys['s']) dy += this.speed;
        if (keys['a']) dx -= this.speed;
        if (keys['d']) dx += this.speed;

        // Comprobación de colisiones básica (esquinas del hitbox)
        if (dx !== 0 && !world.isSolid(this.x + dx + (dx > 0 ? this.width : 0), this.y) && 
                        !world.isSolid(this.x + dx + (dx > 0 ? this.width : 0), this.y + this.height)) {
            this.x += dx;
        }
        if (dy !== 0 && !world.isSolid(this.x, this.y + dy + (dy > 0 ? this.height : 0)) && 
                        !world.isSolid(this.x + this.width, this.y + dy + (dy > 0 ? this.height : 0))) {
            this.y += dy;
        }
    }

    draw(ctx, camera) {
        // Placeholder del personaje. Sustituir por: 
        // ctx.drawImage(spriteSheet, frameX, frameY, w, h, x - camera.x, y - camera.y, w, h)
        ctx.fillStyle = '#ffb74d'; // Color piel/humano placeholder
        ctx.fillRect(
            Math.floor(this.x - camera.x), 
            Math.floor(this.y - camera.y), 
            this.width, 
            this.height
        );
    }
}