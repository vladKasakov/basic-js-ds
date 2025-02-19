const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (true) {
      if (currentNode.data === data) return;

      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, includeParent = false) {
    let currentNode = this.rootNode;
    let parentNode = null;

    while (true) {
      if (!currentNode || currentNode.data === data) {
        return includeParent ? [currentNode, parentNode] : currentNode;
      }

      parentNode = currentNode;

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  remove(data) {
    const [currentNode, parentNode] = this.find(data, true);

    if (!currentNode) return;

    // 1. Deleting a node with no descendants
    if (!currentNode.left && !currentNode.right) {
      if (parentNode) {
        parentNode.left === currentNode
          ? (parentNode.left = null)
          : (parentNode.right = null);
      } else {
        this.rootNode = null;
      }

      return;
    }

    // 2. Deleting a node with one descendant
    if (!currentNode.left || !currentNode.right) {
      let child = currentNode.left || currentNode.right;

      if (parentNode) {
        parentNode.left === currentNode
          ? (parentNode.left = child)
          : (parentNode.right = child);
      } else {
        this.rootNode = child;
      }

      return;
    }

    // 3. Deleting a node with two descendants
    let successorParent = currentNode;
    let minRight  = currentNode.right;

    while (minRight.left) {
      successorParent = minRight ;
      minRight  = minRight.left;
    }
  
    currentNode.data = minRight.data;
  
    if (successorParent.left === minRight) {
      successorParent.left = minRight.right;
    } else {
      successorParent.right = minRight.right;
    }
  
  }

  min() {
    if (!this.rootNode) return this.rootNode;

    let currentNode = this.rootNode;

    while (true) {
      if (!currentNode.left) return currentNode.data;
      currentNode = currentNode.left;
    }
  }

  max() {
    if (!this.rootNode) return this.rootNode;

    let currentNode = this.rootNode;

    while (true) {
      if (!currentNode.right) return currentNode.data;
      currentNode = currentNode.right;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
