class Tree {
    constructor(value, allowed= true) {
        this.value = value;
        this.children = new Map();
        this.allowed = allowed;
    }

    addChild(key, value) {
        const child = new Tree(value);
        this.children.set(key, child);
        return child;
    }
}

export default Tree;
