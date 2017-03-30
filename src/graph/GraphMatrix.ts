export default class GraphMatrix { // 有向图
	private vexNum: number;
	private graph: number[][] = [];
	private visited: boolean[] = [];
	public arcs: number[][] = [];
	public constructor() {
	}
	public create(arcs: number[][] = [], vexNum: number){
		this.vexNum = vexNum;
		this.arcs = arcs;
		for(let i = 0; i < vexNum; i++) {
			this.graph[i] = [];
			for(let j = 0; j < vexNum; j++) {
				this.graph[i][j] = 0;
			}
		}
		for(let i = 0; i < arcs.length; i++) {
			let arc = arcs[i];
			this.graph[arc[0]][arc[1]] = arc[2]; 
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
				if(this.graph[v][w] && !this.visited[w]) {
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
				if(this.graph[v][w] && !this.visited[w]) {
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
				if(this.graph[v][w] && dist[w] === -1) {
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
				if(this.graph[v][w] && collected[w] === false) {
					if(dist[v] + this.graph[v][w] < dist[w]) {
						dist[w] = dist[v] + this.graph[v][w];
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
		let d: number[][] = [];
		let path: number[][] = [];
		for(let i = 0; i < this.vexNum; i++) {
			d[i] = [];
			path[i] = [];
			for(let j = 0; j < this.vexNum; j++) {
				d[i][j] = this.graph[i][j] || Number.MAX_VALUE;
				path[i][j] = -1;
			}
		}
		for(let k = 0; k < this.vexNum; k++) {
			for(let i = 0; i < this.vexNum; i++) {
				for(let j = 0; j < this.vexNum; j++) {
					if(d[i][k] + d[k][j] < d[i][j]) {
						d[i][j] = d[i][k] + d[k][j];
						path[i][j] = k;
					}
				}
			}
		}
		console.log('d: ', d, 'path: ', path);
	}

	// 最小生成树
	// 包含全部顶点，连通，没回路，V个顶点一定有V-1条边(v-1条边都在图里)
	// 贪心算法

	// 拓扑排序
	public topSort(): number[]{
		// 入度
		let inDegree = [];
		for(let i = 0; i < this.vexNum; i++) {
			inDegree[i] = 0;
		}
		for(let i = 0; i < this.arcs.length; i++) {
			let arc = this.arcs[i];
			let node = arc[1];
			inDegree[node]++;
		}

		let stack = [];
		for(let i = 0; i < this.vexNum; i++) {
			if(!inDegree[i]) stack.push(i);
		}
		let sort = [];
		while(stack.length) {
			let v = stack.shift();
			// 输出v
			sort.push(v);
			for(let i = 0; i < this.vexNum; i++) {
				if(this.graph[v][i] && sort.indexOf(i) === -1) {
					inDegree[i]--;
					if(inDegree[i] === 0) {
						stack.push(i);
					}
				}
			}
		}
		if(sort.length < this.vexNum) {
			console.log('图中有回路');
		}
		console.log('sort: ', sort);
		return sort;
	}
	// 关键路径
	public criticalPath() {
		let {sort, evt} = this.topSort1();
		let ltv = []; // 事件最晚发生时间
		for(let i = 0; i < this.vexNum; i++) {
			ltv[i] = evt[i];
		}

		while(sort.length) {
			let v = sort.pop();
			for(let i = 0; i < this.vexNum; i++) {
				let weight = this.graph[v][i];
				if(weight>0) {

					if(ltv[i] - weight < ltv[v]) {
						ltv[v] = ltv[i] - weight;
					}
				}
			}
		}

		console.log('ltv: ',ltv);
		for(let i = 0; i < this.vexNum; i++) {
			for(let w = 0; w < this.vexNum; w++) {
				if(this.graph[i][w]){
					let ete = evt[i]; // 活动最早发生时间
					let lte = ltv[w] - this.graph[i][w]; // 活动最晚发生时间
					if(ete === lte) {
						console.log(i, w);
					} 
				}
			}
		}
	}

	private topSort1(){
		// 入度
		let inDegree = [];
		// etv: 事件最早发生的时间
		let evt = [];

		for(let i = 0; i < this.vexNum; i++) {
			inDegree[i] = 0;
			evt[i] = 0;
		}
		for(let i = 0; i < this.arcs.length; i++) {
			let arc = this.arcs[i];
			let node = arc[1];
			inDegree[node]++;
		}
		
		let stack = [];
		for(let i = 0; i < this.vexNum; i++) {
			if(!inDegree[i]) stack.push(i);
		}
		let sort = [];
		while(stack.length) {
			let v = stack.shift();
			// 输出v
			sort.push(v);
			for(let i = 0; i < this.vexNum; i++) {
				if(this.graph[v][i] && sort.indexOf(i) === -1) {
					inDegree[i]--;
					if(inDegree[i] === 0) {
						stack.push(i);
					}
					if(evt[v] + this.graph[v][i] > evt[i]) {
						evt[i] = evt[v] + this.graph[v][i];
					}
				}
			}
		}
		if(sort.length < this.vexNum) {
			console.log('图中有回路');
		}
		console.log('sort: ', sort, 'evt: ', evt);
		return {
			sort: sort,
			evt: evt
		}
	}

	// 从V顶点出发，深度优先搜索
	private DFS(v: number) {
		this.visited[v] = true;
		console.log('v: ', v); // 输出 v
		for(let i = 0; i < this.vexNum; i++) {
			if(this.graph[v][i] && !this.visited[i]) {
				this.DFS(i);
			}
		}
	}
	private resetVisited() {
		for(let v = 0; v < this.vexNum; v++) {
			this.visited[v] = false;
		}
	}
} 