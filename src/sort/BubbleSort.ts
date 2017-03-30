export default class BubbleSort {
	public sort(A: number[] = [], n: number) {
		for (let p = n - 1; p > 1; p--) {
			let flag = false;
			for (let i = 0; i < p; i++) {
				if (A[i + 1] < A[i]) {
					// 交换 A[i + 1] 和 A[i]
					let temp = A[i + 1];
					A[i + 1] = A[i];
					A[i] = temp;
					flag = true;
				}
			}
			if(flag) return;
		}
	}
}