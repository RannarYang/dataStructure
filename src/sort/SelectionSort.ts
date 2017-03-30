import SortImp from './SortImp'
export default class SelectionSort implements SortImp {
	public sort(A: number[], n: number) { 
		for (let i = 0; i < n; i++) {
			let minPos = this.scanForMin(A, i, n-1);
			// swap A[i] A[minPos]
			let temp = A[i];
			A[i] = A[minPos];
			A[minPos] = temp;
		}
		console.log('A: ', A);
	}
	private scanForMin(A: number[], start: number, end: number) {
		let minPos = start;
		let minVal = A[start];
		for (let i = start + 1; i <= end; i++) {
			if(A[i] < minVal) {
				minPos = i;
				minVal = A[i];
			}
		}
		return minPos;
	}
}