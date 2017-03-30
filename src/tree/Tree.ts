import Node from './Node';
export default class Tree {
	private root : Node = null;
	public insert(element: any) {
		var node = new Node(element, null, null);
		if (this.root === null) {
			this.root = node;
		} else {
			this.insertNode(this.root, node);
		}
		console.log(this.root);
	}
	public delete(element: any) {
		this.deleteNode(element, this.root);
	}
	
	public preOrderTraversal() {
		this.preOrderTraversalNode(this.root);
	}
	public inOrderTraversal() {
		this.inOrderTraversalNode(this.root);
	}
	public postOrderTraversal() {
		this.postOrderTraversalNode(this.root);
	}
	public levelOrderTraversal() {
		let queue : Node[] = [];
		if(!this.root) {
			return;
		}
		queue.push(this.root);
		while(queue.length) {
			let node = queue.shift();
			console.log(node.data);
			if(node.left) {
				queue.push(node.left);
			}
			if(node.right) {
				queue.push(node.right);
			}
		}
	}
	public postOrderGetHeight() {
		return this.postOrderGetHeightNode(this.root);
	}
	public iterFind(x: number) {
		let bt = this.root;
		while(bt) {
			if(x > bt.data) {
				bt = bt.right;
			} else if(x < bt.data) {
				bt = bt.left;
			} else {
				return bt;
			}
		}
		return null;
	}
	public find(x: number): Node{
		return this.findNode(x, this.root);
	}
	public findMin(): Node {
		return this.findMinNode(this.root);
	}
	public findMax(): Node {
		return this.findMaxNode(this.root);
	}
	public insert1(x: number) {

		if (this.root === null) {
			var node = new Node(x, null, null);
			this.root = node;
		} else {
			this.insertNode1(x, this.root);
		}
		
	}
	private insertNode1(x: number, bt: Node) {
		if(!bt) {
			bt = new Node(x, null, null);
		} else {
			if(x < bt.data) {
				bt.left = this.insertNode1(x, bt.left);
			}else if(x > bt.data) {
				bt.right = this.insertNode1(x, bt.right);
			}
		}
		return bt;
	}
	private deleteNode(x: number, bt: Node) {
		let node : Node = null;
		if(!bt) console.log('要刪除的元素未找到');
		else if( x < bt.data) {
			bt.left = this.deleteNode(x, bt.left);
		}else if(x > bt.data) {
			bt.right = this.deleteNode(x, bt.right);
		} else { // 找到要刪除的節點
			if(bt.left && bt.right) { // 被刪除的節點由左右兩個子節點
				node = this.findMinNode(bt.right);
				bt.data = node.data;
				bt.right = this.deleteNode(bt.data, bt.right);
			} else { // 被刪除節點有一個或無子節點
				node = bt;
				if(!bt.left) {
					bt = bt.right;
				}else if(!bt.right) {
					bt = bt.left;
				}
			}
		}
		return bt;
	}
	private findNode(x: number,bt: Node): Node{
		if(!bt) return null;
		if(x > bt.data) {
			return this.findNode(x, bt.right);
		} else if(x < bt.data) {
			return this.findNode(x, bt.left);
		} else {
			return bt;
		}
	}
	private findMinNode(bt: Node): Node {
		if(!bt) return null;
		else if(!bt.left) {
			return bt;
		}else{
			return this.findMinNode(bt.left);
		}
	}
	private findMaxNode(bt: Node) : Node {
		if(bt) {
			while(bt.right) {
				bt = bt.right;
			}
		}
		return bt;
	}
	
	private preOrderTraversalNode(bt: Node) {
		if(bt) {
			console.log(bt.data);
			this.preOrderTraversalNode(bt.left);
			this.preOrderTraversalNode(bt.right);
		}
	}
	private inOrderTraversalNode(bt: Node) {
		if(bt) {
			this.inOrderTraversalNode(bt.left);
			console.log(bt.data);
			this.inOrderTraversalNode(bt.right);
		}
	}
	private postOrderTraversalNode(bt: Node) {
		if(bt) {
			this.postOrderTraversalNode(bt.left);
			this.postOrderTraversalNode(bt.right);
			console.log(bt.data);
		}
	}
	private postOrderGetHeightNode(bt: Node) {
		let hl: number;
		let hr: number;
		let maxH: number;
		if( bt ) {
			hl = this.postOrderGetHeightNode(bt.left);
			hr = this.postOrderGetHeightNode(bt.right);
			maxH = (hl > hr) ? hl : hr;
			return maxH + 1;
		}
		else return 0;
	}

	private insertNode(node : Node, newNode : Node) {
		if(newNode.data < node.data) {
			if(node.left === null) {
				node.left = newNode;
			} else {
				this.insertNode(node.left, newNode);
			}
		} else {
			if(node.right === null) {
				node.right = newNode;
			} else {
				this.insertNode(node.right, newNode);
			}
		}
	}
}