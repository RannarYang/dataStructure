export default class UnGraphMatrix {
	private vexNum: number;
	private graph: number[]; // 无向图邻接矩阵 G[i][j] = unDiGraph[i * (i + 1) / 2 + j]
	private visited: boolean[] = [];
	private arcs: number[][];
	public constructor(graph: number[] = [], vexNum: number = 0) {
		this.graph = graph;
		this.vexNum = vexNum;
	}
	public create(arcs: number[][] = [], vexNum: number){
		this.arcs = arcs;
		this.vexNum = vexNum;
		let node = (vexNum + 1) * vexNum;
		for(let i = 0; i < node; i++) {
			this.graph[i] = 0;
		}
		for(let i = 0; i < arcs.length; i++) {
			let arc = arcs[i];
			this.setArc(arc[0], arc[1], arc[2]);
		}
	}
	// 深度优先遍历
	public DFSTraverse(fn = () => {}) {
		this.resetVisited();
		for(let v = 0; v < this.vexNum; v++) {
			if(!this.visited[v]) {
				this.DFS(v);
			}
		}
	}
	public BFSTraverse(v: number) {
		this.resetVisited();
		this.visited[v] = true;
		console.log(v); // 输出
		let queue = [];
		queue.push(v);
		while(queue.length) {
			let v = queue.shift();
			for(let w = 0; w < this.vexNum; w++) {
				if(this.arc(v, w) && !this.visited[w]) {
					this.visited[w] = true;
					console.log(w);
					queue.push(w);
				}
			}
		}
	}

	// 一直遍历到layer层有的数目
	public BFSTraverseByLayer(v: number, layer: number) : number{
		this.resetVisited();
		this.visited[v] = true;
		let count = 1;
		console.log(v); // 输出
		let queue = [];
		queue.push(v);
		let level = 0; // 当前顶点所在的层数
		let last = v; // 当前这一层访问的最后一个节点
		while(queue.length) {
			let v = queue.shift();
			let tail;
			for(let w = 0; w < this.vexNum; w++) {
				if(this.arc(v, w) && !this.visited[w]) {
					this.visited[w] = true;
					console.log(w);
					queue.push(w);
					count++;
					tail = w;
				}
			}
			if(v === last) {
				level++;
				last = tail;
			}
			if(level === layer) break;
		}
		return count;
	}
	// 最短路径 ：按照递增(非递减)的顺序找到各个顶点的最短路
	// 1、无权图的单源最短路算法
	public unWeighted(v: number) { // T = O(V + E);
		let queue: number[] = [];
		let dist: number[] = [];
		let path: number[] = [];
		// 初始化dist
		for(let i = 0; i < this.vexNum; i++) {
			dist[i] = -1;
			path[i] = -1;
		}

		queue.push(v);
		dist[v] = 0;
		while(queue.length) {
			v = queue.shift();
			for(let w = 0; w < this.vexNum; w++) {
				if(this.arc(v,w) && dist[w] === -1) {
					dist[w] = dist[v] + 1;
					path[w] = v;
					queue.push(w);
				}
			}
		}
		console.log('dist: ', dist, 'path: ', path);
	}
	//2、有权图单源最短路算法
	public shortestPath_DIJ(v: number) {
		let collected :boolean[] = [];
		let dist : number[] = [];
		let path : number[] = [];
		for(let i = 0; i < this.vexNum; i++) {
			collected[i] = false;
			dist[i] = Number.MAX_VALUE - 1;
			path[i] = undefined;
		}

		dist[v] = 0;

		while(true) {
			// 未收录顶点中dist最小者 v
			// 直接扫描所有未收录的顶点 T = O(V*V + E) 对稠密图效果好
			let min = Number.MAX_VALUE;
			let v = undefined;
			for(let i = 0; i < this.vexNum; i++) {
				if(collected[i] === false && dist[i] < min) {
					v = i;
					min = dist[i];
				}
			}
			// 将dist存在最小堆中 O(logV) 更新dist[w]的值-O(logV)
			// T = O(VlogV + ElogV) = O(ElogV); 对于稀疏图效果好
			if(v === undefined) break;
			collected[v] = true; // 把v收录进去
			for(let w = 0; w < this.vexNum; w++) {
				if(this.arc(v,w) && collected[w] === false) {
					if(dist[v] + this.arc(v, w) < dist[w]) {
						dist[w] = dist[v] + this.arc(v,w);
						path[w] = v;
					}
				}
			}
		}
		console.log('collected:', collected, 'dist: ', dist, 'path: ', path);
	}
	// 3、多源最短路算法
	// ① 直接将单源最短路算法调用v遍 ： 对稀疏图效果好 T = O(V * V * V + V * E);
	// ② Floyd算法 :对稠密图效果较好 T= O(V * V * V)

	public shortestPath_Floyd() {

	}

	// 最小生成树
	// 包含全部顶点，连通，没回路，V个顶点一定有V-1条边(v-1条边都在图里)
	// 贪心算法
	// prim 适合稠密图
	public prim() {
		let parent: number[] = [];
		parent[0] = -1;

		let dist : number[] = [];
		for(let i = 0; i < this.vexNum; i++) {
			if(this.arc(0, i)) {
				dist[i] = this.arc(0, i);
				parent[i] = 0;
			} else {
				dist[i] = Number.MAX_VALUE - 1;
			}
		}
		dist[0] = 0;
		while(true) {
			let v = undefined;
			// v 为未收录顶点中dist最小者
			let min = Number.MAX_VALUE; 
			for(let i = 0; i < this.vexNum; i++) {
				if( dist[i] !== 0 && dist[i] < min) {
					v = i;
					min = dist[i];
				}
			}
			if(v === undefined) {
				break;
			}
			dist[v] = 0; // 把v收录进去
			for(let w = 0; w < this.vexNum; w++) {
				if(this.arc(v,w) && dist[w] !== 0) {
					if(this.arc(v, w) < dist[w]) {
						dist[w] = this.arc(v,w);
						parent[w] = v;
					}
				}
			}
		}
		
		let linkNode = dist.filter((v)=>{
			return v === 0;
		});
		let resultStr = linkNode.length === this.vexNum ? '图是连通图': '生成树不存在/图不连通';
		console.log('result:', resultStr, 'dist: ', dist, 'parent: ', parent);

	}
	// kruskal算法：将森林合并成树 适用于稀疏图
	public kruskal() {
		let MST = [];
	}
	// 拓扑排序
	

	// 从V顶点出发，深度优先搜索
	private DFS(v: number) {
		this.visited[v] = true;
		console.log('v: ', v); // 输出 v
		for(let i = 0; i < this.vexNum; i++) {
			if(this.arc(v, i) && !this.visited[i]) {
				this.DFS(i);
			}
		}
	}
	private resetVisited() {
		for(let v = 0; v < this.vexNum; v++) {
			this.visited[v] = false;
		}
	}
	private arc(i: number, j: number) {
		if(i == j) return 0;
		if(i < j) {
			[i, j] = [j, i];	
		}
		return this.graph[i * (i + 1) / 2 + j];
	}
	private setArc(i: number, j: number, weight: number) {
		if(i===j) return;
		if(i < j) {
			[i, j] = [j, i];	
		}
		this.graph[i * (i + 1) / 2 + j] = weight;
	}
}