class World {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = [];
        this.generateMap();
    }

    generateMap() {
        // Generación de mapa básico (0: Hierba, 1: Árbol/Sólido, 2: Agua)
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                    row.push(1); // Bordes sólidos
                } else {
                    let rand = Math.random();
                    if (rand < 0.1) row.push(1); // 10% árboles/rocas
                    else if (rand < 0.15) row.push(2); // 5% agua
                    else row.push(0); // Hierba/Camino
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
        return tileType === 1 || tileType === 2; // Árboles y agua son sólidos por ahora
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
                    
                    // Colores de placeholder. Aquí luego usarías ctx.drawImage() con tus tilesets
                    if (tile === 0) ctx.fillStyle = '#2e7d32'; // Hierba
                    if (tile === 1) ctx.fillStyle = '#3e2723'; // Tronco/Roca
                    if (tile === 2) ctx.fillStyle = '#1565c0'; // Agua
                    
                    ctx.fillRect(
                        Math.floor(x * this.tileSize - camera.x), 
                        Math.floor(y * this.tileSize - camera.y), 
                        this.tileSize, 
                        this.tileSize
                    );
                }
            }
        }
    }
}