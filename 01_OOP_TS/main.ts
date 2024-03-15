class TreeNode<T> {
  public left: TreeNode<T> | null;
  public right: typeof this.left;
  constructor(public value: T) {
    this.left = null;
    this.right = null;
  }
}

class BST<T> {
  public root: TreeNode<T> | null;
  constructor() {
    this.root = null;
  }
  isEmpty() {
    return this.root === null;
  }

  insert(value: T) {
    const node = new TreeNode(value);
    if (this.isEmpty()) {
      this.root = node;
    } else {
      this.insertNode(this.root!, node);
    }
  }
  private insertNode(root: Required<TreeNode<T>>, node: Required<TreeNode<T>>) {
    if (node.value < root.value) {
      // left insertion
      if (root.left == null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }
    } else {
      // right insertion
      if (root.right == null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }
    }
  }

  search(value: T) {
    return this.searchTree(this.root, value);
  }
  private searchTree(root: TreeNode<T> | null, value: T): boolean {
    if (!!!root) return false;
    if (root.value === value) return true;
    if (root.value < value) {
      // go to the right
      return this.searchTree(root.right, value);
    } else {
      // go to teh left
      return this.searchTree(root.left, value);
    }
  }

  min() {
    return this.searchMin(this.root);
  }
  private searchMin(root: TreeNode<T> | null): T | null {
    if (!root) return null;
    if (!root.left) return root.value;
    return this.searchMin(root.left);
  }

  max() {
    return this.searchMax(this.root);
  }
  private searchMax(root: TreeNode<T> | null): T | null {
    if (!root) return null;
    if (!root.right) return root.value;
    return this.searchMax(root.right);
  }

  delete(value: T) {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(root: TreeNode<T> | null, value: T) {
    if (root === null) return root;
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (root > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!!!root.left && !!!root.right) return null;
      if (!!!root.left) {
        return root.right;
      } else if (!!!root.right) {
        return root.left;
      }
      root.value = this.searchMin(root.right)!;
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }

  preOrder() {
    console.log(this._preOrder(this.root).join(", "));
  }
  inOrder() {
    console.log(this._inOrder(this.root).join(", "));
  }
  postOrder() {
    console.log(this._postOrder(this.root).join(", "));
  }

  private _preOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      values.push(root.value); // read the value
      const leftValues = this._preOrder(root.left);
      values.push(...leftValues);
      const rightValues = this._preOrder(root.right);
      values.push(...rightValues);
    }
    return values;
  }
  private _inOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      const leftValues = this._inOrder(root.left);
      values.push(...leftValues);
      values.push(root.value); // read the value
      const rightValues = this._inOrder(root.right);
      values.push(...rightValues);
    }
    return values;
  }
  private _postOrder(root: TreeNode<T> | null): T[] {
    const values: T[] = [];
    if (root) {
      const leftValues = this._postOrder(root.left);
      values.push(...leftValues);
      const rightValues = this._postOrder(root.right);
      values.push(...rightValues);
      values.push(root.value); // read the value
    }
    return values;
  }

  levelOrder() {
    const queue = [];
    const values: T[] = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      if (curr) {
        values.push(curr.value);
        if (curr.left) {
          queue.push(curr.left);
        }
        if (curr.right) {
          queue.push(curr.right);
        }
      }
    }
    console.log(values.join(", "));
  }

  height() {
    return this.getHeight(this.root);
  }
  private getHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBST() {
    return this._isBST(this.root, this.min(), this.max());
  }

  private _isBST(node: TreeNode<T> | null, min: any, max: any): boolean {
    if (!node) {
      return true;
    }
    if (node.value < min || node.value > max) {
      return false;
    }
    return (
      this._isBST(node.left, min, node.value) &&
      this._isBST(node.right, node.value, max)
    );
  }

  printLevel(level: number) {
    console.log(this._printLevel(this.root, level).join("-----"));
  }
  private _printLevel(node: TreeNode<T> | null, level: number): string[] {
    const values: string[] = [];
    if (!node) {
      return values;
    }
    if (level === 1) {
      values.push(`[ ${node.value} ]`);
    } else if (level > 1) {
      const v0 = this._printLevel(node.left, level - 1);
      const v1 = this._printLevel(node.right, level - 1);
      values.push(...v0, ...v1);
    }
    return values;
  }
}

const bst = new BST<number>();
bst.insert(10);
bst.insert(0);
bst.insert(20);
bst.insert(99);
bst.insert(5);
bst.insert(3);
bst.insert(21);

bst.printLevel(3);
