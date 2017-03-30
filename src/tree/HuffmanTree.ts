import MinHeap from './MinHeap';
import Node from './Node';
export default class HuffmanTree {
	public constructor(arr: number[]) {
		let heap = new MinHeap();
		heap.build(arr);
		// heap.deleteMin();
		// for(let i = 0; i < heap.elesLen; i++) {
		// 	let node = new Node(null, null, null);
		// 	node.left = new Node(heap.deleteMin(), null, null);
		// 	node.right = new Node(heap.deleteMin(), null, null);
		// 	node.data = node.left.data + node.right.data;
		// 	heap.insert(node.data);
		// 	console.log(node);
		// }
	}
}