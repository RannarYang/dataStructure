import SortImp from './SortImp';
import InsertionSort from './InsertionSort';
export default class QuickSort implements SortImp{
	private static cutoff = 100;
	public sort(A: number[], n: number) {
		// 分而治之
		this.quickSort(A, 0, n - 1 );
	}
	private quickSort(A: number[], left: number, right: number) {
		if (QuickSort.cutoff <= right - left) {
			let pivot = this.median3(A, left, right); // 选主元 取头、中、尾的中位数
			let i = left - 1;
			let j = right -1;
			while (true) {
				while (A[++i] < pivot) {}
				while (A[--j] > pivot) {}

				if (i < j) {
					// swap A[i] 和 A[j];
					[A[i], A[j]] = [A[j], A[i]];
				} else {
					break;
				}
			}
			[A[i], A[right - 1]] = [A[right - 1], A[i]];
			this.quickSort(A, left, i - 1);
			this.quickSort(A, i+1, right);
		} else {
			let insertionSort = new InsertionSort()
			insertionSort.sortArr(A, left, right);
		}
		
	}
	private median3(A: number[], left: number, right: number) {
		// A[left] <= A[center] <= A[right]
		let center: number = Math.floor((left + right) / 2);
		if (A[left]  > A[center]) {
			let temp = A[left];
			A[left] = A[center];
			A[center] = temp;
		}

		if (A[left] > A[right]) {
			let temp = A[left];
			A[left] = A[right];
			A[right] = temp;
		}

		if (A[center] > A[right]) {
			let temp = A[center];
			A[center] = A[right];
			A[right] = temp;
		}
		// swap A[center] A[right-1]  将pivot藏到最右边
		let temp = A[center];
		A[center] = A[right - 1];
		A[right - 1] = temp;
		// 只需考虑A[left + 1] A[right - 2] 这一段的数组
		return A[right - 1];
	}
}