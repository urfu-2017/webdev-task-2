export class Place {
    constructor(id, name) {
        this.id = id;
        this.priority = -1;
        this.name = name;
        this.visited = false;
        this.createdAt = new Date();
    }
}

