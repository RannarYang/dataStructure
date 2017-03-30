import SortImp from './SortImp';
export default class HeapSort implements SortImp {
	public sort(A: number[], n: number) :void{
		for(let i = Math.floor(n / 2); i >= 0; i--) {
			this.percDown(A, i,n);
		}
		for(let i = n - 1; i > 0; i--) {
			// deleteMax
			let temp = A[i];
			A[i] = A[0];
			A[0] = temp;

			// 重新调整为最大堆
			this.percDown(A, 0, i);
		}
	}

	// 调整成最大堆
	private percDown(A: number[], parent: number, n: number) {
	

		let temp = A[parent];
		while (parent * 2 <= n - 1) {
			let child = parent * 2;
			// 取左右儿子中比较大的那个
			if (child != n - 1 && (A[child] < A[child + 1])) {
				child ++;
			}

			if(temp >= A[child]) {
				break;
			} else {
				// 移动temp元素到下一层
				A[parent] = A[child];
			}
			parent = child;
		}
		A[parent] = temp;
	
	}
	
}