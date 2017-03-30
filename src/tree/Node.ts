export default class Node {
	public left : Node;
	public right : Node;
	public level: number;
	public data: any;
	public constructor(data : any, left: Node, right: Node) {
		this.left = left;
		this.right = right;
		this.data = data;
	}
}