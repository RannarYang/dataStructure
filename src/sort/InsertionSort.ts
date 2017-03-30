import SortImp from './SortImp';
export default class InsertionSort implements SortImp {
	public sort(A: number[], n: number) {
		for (let p = 1; p < n; p++) {
			let temp = A[p];
			for (var i = p - 1 ; i >= 0  && A[i] > A[p]; i--) {
				A[i + 1] = A[i];
			}
			A[i + 1] = temp;
		}
		// 或者 this.sortArr(A, 0, n - 1);
	}
	public sortArr(A: number[], start: number, end: number) {
		for (let p = start + 1; p < end - start + 1; p++) {
			let temp = A[p];
			for (var i = p - 1 ; i >= 0  && A[i] > A[p]; i--) {
				A[i + 1] = A[i];
			}
			A[i + 1] = temp;
		}
	}
}