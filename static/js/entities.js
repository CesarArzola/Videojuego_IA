class Player {
    constructor(x, y, race) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 4;
        
        this.race = race.name || 'Humano';
        this.maxHp = race.hp || 100;
        this.hp = this.maxHp;
        this.maxMp = race.mp || 50;
        this.mp = this.maxMp;
        this.maxSp = race.sp || 80;
        this.sp = this.maxSp;
        
        this.inventory = new Inventory(40);

        // Ruta hacia la carpeta static/assets/
        this.sprite = new Image();
        this.sprite.src = 'static/assets/player_sprites.png';
        this.loaded = false;
        this.sprite.onload = () => {
            this.loaded = true;
        };

        this.frameX = 0; // Sub-imagen horizontal
        this.frameY = 0; // Dirección (0: Abajo, 1: Izquierda, 2: Derecha, 3: Arriba)
        this.animTimer = 0;
        this.isMoving = false;
    }

    update(keys, world) {
        if (this.inventory.isOpen) return;

        let dx = 0;
        let dy = 0;

        if (keys['w']) dy -= this.speed;
        if (keys['s']) dy += this.speed;
        if (keys['a']) dx -= this.speed;
        if (keys['d']) dx += this.speed;

        this.isMoving = (dx !== 0 || dy !== 0);

        // Orientación de fotogramas según la tecla presionada
        if (dy > 0) this.frameY = 0;
        if (dx < 0) this.frameY = 1;
        if (dx > 0) this.frameY = 2;
        if (dy < 0) this.frameY = 3;

        // Bucle de animación de caminata
        if (this.isMoving) {
            this.animTimer++;
            if (this.animTimer % 10 === 0) {
                this.frameX = (this.frameX + 1) % 4; // Avanza entre 4 fotogramas
            }
        } else {
            this.frameX = 0; // Reposo
        }

        // Físicas con detección de colisiones
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
        let drawX = Math.floor(this.x - camera.x);
        let drawY = Math.floor(this.y - camera.y);

        if (this.loaded) {
            ctx.drawImage(
                this.sprite,
                this.frameX * this.width,  // Posición de corte X
                this.frameY * this.height, // Posición de corte Y
                this.width,                // Ancho del corte
                this.height,               // Alto del corte
                drawX,                     // Coordenada X en pantalla
                drawY,                     // Coordenada Y en pantalla
                this.width,                // Escala final X
                this.height                // Escala final Y
            );
        } else {
            ctx.fillStyle = '#ffb74d';
            ctx.fillRect(drawX, drawY, this.width, this.height);
        }
    }
}