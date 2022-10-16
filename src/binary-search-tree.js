const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.roote = null;
  }
  root() {
    return this.roote
  }

  add(data) {
    this.roote = addWithin(this.roote, data);

    function addWithin(node, data) {
      if (!node) {
        node = new Node(data);
        return node;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        node.right = addWithin(node.right, data);
      } else {
        node.left = addWithin(node.left, data);
      }

      return node;
    }
  }


  has(data) {
    return searchWithin(this.roote, data);

    function searchWithin(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data)
    }
  }

  find(data) {

    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
    return findNode(this.roote, data);
  }

  remove(data) {
    this.roote = removeNode(this.roote, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node
        }
        if (!node.right) {
          node = node.left;
          return node
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node
      }
    }
  }

  min() {
    if (!this.roote) {
      return;
    }
    let node = this.roote;
    while (node.left) {
      node = node.left;
    }
    return node.data
  }

  max() {
    if (!this.roote) {
      return;
    }
    let node = this.roote;
    while (node.right) {
      node = node.right;
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};