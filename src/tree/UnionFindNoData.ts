export default class UnionFindNoData {
	private setType: number[] = []
	public constructor(union : number[][]) {
		// 方法1：
		// for(let i = 0; i < union.length; i++) {
		// 	let parent = union[i][0];
		// 	this.setType[parent] = -1;
		// 	for(let j = 1; j < union[i].length; j++) {
		// 		let node = union[i][j];
		// 		this.setType[node] = parent;
		// 		this.setType[parent] = -2;
		// 	}
		// }
		// 方法2：
		for(let i = 0; i < union.length; i++) {
			let parent = union[i][0];
			this.setType[parent] = -1;
			for(let j = 1; j < union[i].length; j++) {
				let node = union[i][j];
				this.setType[node] = parent;
				this.setType[parent]--;
			}
		}
		console.log(this.setType);
	}
	public find(x: number) : number{
		// 方法1
		// while(this.setType[x] >= 0) {
		// 	x = this.setType[x];
		// }
		// console.log(x);
		// return x;

		// 方法2：路径压缩
		if(this.setType[x] < 0) {
			return x;
		} else {
			return this.setType[x] = this.find(this.setType[x]);
		}
	}
	public union(x1: number, x2: number) {
		// 方法1：
		// let root1 = this.find(x1);
		// let root2 = this.find(x2);
		// if(root1!== -1 && root1 !== root2) {
		// 	if(this.setType[root2] < this.setType[root1]) {
		// 		this.setType[root1] = root2;
		// 	} else {
		// 		if(this.setType[root2] === this.setType[root1]) {
		// 			this.setType[root1] --;
		// 		}
		// 		this.setType[root2] = root1;
		// 	}
			
		// }
		// 方法2：
		let root1 = this.find(x1);
		let root2 = this.find(x2);
		if(root1!== -1 && root1 !== root2) {
			if(this.setType[root2] < this.setType[root1]) {
				this.setType[root2] += this.setType[root1];
				this.setType[root1] = root2;
			} else {
				this.setType[root1] += this.setType[root2];
				this.setType[root2] = root1;
			}
			
		}
		console.log(this.setType);
	}
}