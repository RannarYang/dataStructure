export default class UnionFind {
	private nodes :{data: any, parent: number}[] = [];
	public constructor(union : any[][]) {
		for(let i = 0; i < union.length; i++) {
			let parentNode = {data: union[i][0], parent: -1};
			let index = this.nodes.push(parentNode) - 1;
			for(let j = 1; j < union[i].length; j++) {
				let node = {data: union[i][j], parent: index};
				this.nodes.push(node);
			}
		}
	}
	public find(data: any) {
		let i;
		for(i = 0; i < this.nodes.length && this.nodes[i].data !== data; i++){}
		if(i >= this.nodes.length) return -1;
		while(this.nodes[i].parent >= 0) {
			i = this.nodes[i].parent;
		}
		return i;
	}
	public union(data1: any, data2: any) {
		let root1 = this.find(data1);
		let root2 = this.find(data2);
		if(root1 !== -1 && root2!== -1 && root1 !== root2) this.nodes[root2].parent = root1;
	}
}