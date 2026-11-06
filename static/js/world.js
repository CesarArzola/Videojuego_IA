class World {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = [];

        // Carga de la imagen del terreno desde static/assets/
        this.tileset = new Image();
        this.tileset.src = 'static/assets/tileset.png';
        this.tilesetLoaded = false;
        this.tileset.onload = () => { this.tilesetLoaded = true; };

        this.generateMap();
    }

    generateMap() {
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                    row.push(1); // Muros límite
                } else {
                    let rand = Math.random();
                    if (rand < 0.1) row.push(1); // Árbol / Obstáculo
                    else if (rand < 0.15) row.push(2); // Agua
                    else row.push(0); // Terreno libre
                }
            }
            this.map.push(row);
        }
    }

    isSolid(x, y) {
        let tileX = Math.floor(x / this.tileSize);
        let tileY = Math.floor(y / this.tileSize);
        
        if (tileX < 0 || tileX >= this.width || tileY < 0 || tileY >= this.height) return true;
        let tileType = this.map[tileY][tileX];
        return tileType === 1 || tileType === 2;
    }

    draw(ctx, camera) {
        let startCol = Math.floor(camera.x / this.tileSize);
        let endCol = startCol + (camera.width / this.tileSize) + 1;
        let startRow = Math.floor(camera.y / this.tileSize);
        let endRow = startRow + (camera.height / this.tileSize) + 1;

        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
                if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                    let tile = this.map[y][x];
                    let drawX = Math.floor(x * this.tileSize - camera.x);
                    let drawY = Math.floor(y * this.tileSize - camera.y);

                    if (this.tilesetLoaded) {
                        ctx.drawImage(
                            this.tileset,
                            tile * this.tileSize, 0, // Posición según el índice de tile
                            this.tileSize, this.tileSize,
                            drawX, drawY,
                            this.tileSize, this.tileSize
                        );
                    } else {
                        if (tile === 0) ctx.fillStyle = '#2e7d32';
                        if (tile === 1) ctx.fillStyle = '#3e2723';
                        if (tile === 2) ctx.fillStyle = '#1565c0';
                        ctx.fillRect(drawX, drawY, this.tileSize, this.tileSize);
                    }
                }
            }
        }
    }
}