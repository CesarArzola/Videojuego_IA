class Inventory {
    constructor(slots) {
        this.slots = slots;
        this.items = new Array(slots).fill(null);
        this.isOpen = false;
        this.initUI();
    }

    initUI() {
        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';
        for (let i = 0; i < this.slots; i++) {
            let slot = document.createElement('div');
            slot.classList.add('inv-slot');
            slot.dataset.index = i;
            grid.appendChild(slot);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        document.getElementById('inventory-ui').classList.toggle('hidden', !this.isOpen);
    }

    addItem(item) {
        for (let i = 0; i < this.slots; i++) {
            if (!this.items[i]) {
                this.items[i] = item;
                this.updateUI();
                return true;
            }
        }
        return false; // Inventario lleno
    }

    updateUI() {
        // Aquí se actualizarían los iconos (sprites) en cada div según this.items
    }
}