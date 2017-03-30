export default class MinHeap {
	private elements: number[] = [Number.MIN_VALUE]; // elements[0] 是哨兵元素，不少于堆中的最大元素，控制循环结束
	public build(arr: number[]) { // 线性时间复杂度 O(N)
		for(let i = 0; i < arr.length; i++) {
			this.elements[i + 1] = arr[i];
		}
		// 找出第一个有子节点的元素
		let heapNum = Math.floor(this.elements.length / 2);
		for (let parent = heapNum; parent >= 1; parent--) {
			let temp = this.elements[parent];
			while (parent * 2 <= this.elements.length) {
				let child = parent * 2;
				// 取左右儿子中比较小的那个
				if (child != this.elements.length && (this.elements[child] > this.elements[child + 1])) {
					child ++;
				}

				if(temp <= this.elements[child]) {
					break;
				} else {
					// 移动temp元素到下一层
					this.elements[parent] = this.elements[child];
				}
				parent = child;
			}
			this.elements[parent] = temp;
		}
		console.log(this.elements);
	}
	public insert(element: number){// T(N) = O(log(N))
		let i = this.elements.length;

		while(this.elements[Math.floor(i/2)] > element) {
			this.elements[i] = this.elements[Math.floor(i/2)];
			i = Math.floor(i/2);
		}

		this.elements[i] = element;
		console.log(this.elements);
	}
	public delete() {
		let elementsLen = this.elements.length - 1;
		if(elementsLen <= 0) return;
		// 去除根节点的最大值
		let minElement = this.elements[1];
		// 用最大堆中最后一个元素从根节点开始向上过滤下层节点
		let temp = this.elements[elementsLen];
		let parent = 1;
		while (parent * 2 <= elementsLen) {
			let child = parent * 2;
			// 取左右儿子中比较大的那个
			if (child != elementsLen && (this.elements[child] > this.elements[child + 1])) {
				child ++;
			}
			if(temp <= this.elements[child]) {
				break;
			} else {
				// 移动temp元素到下一层
				this.elements[parent] = this.elements[child];
			}
			parent = child;
		}

		this.elements[parent] = temp;
		this.elements.pop();
		console.log(this.elements, minElement);
		return minElement;
	}
}