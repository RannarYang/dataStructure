import SortImp from './SortImp';
/**
 * 在外排序中非常有用
*/
export default class MergeSort implements SortImp{ 
	public sort(A: number[], n: number) {
		let tmpA : number[] = [];
		let length = 1;
		while (length < n) {
			this.mergePass(A, tmpA, n, length);
			length *= 2;
			this.mergePass(tmpA, A, n, length);
			length *= 2;
		}
	}
	private mergePass(A: number[], TmpA: number[], n: number, length: number) {
		for (var i = 0; i <= n - 2 * length; i += 2 * length) {
			this.merge1(A, TmpA, i, i + length, i + 2 * length - 1);
		}
		if (i + length < n) { // 归并最后2个子列
			this.merge1(A, TmpA, i, i + length, n - 1);
		} else {
			for( let j = 1; j < n; j++ ) {
				TmpA[j] = A[j];
			}
		}
	}
	public sort1(A: number[], n: number) {
		let tmpA: number[] = [];
		this.mSort(A, tmpA, 0, n-1);
	}
	// 递归
	private mSort(A: number[], TmpA: number[], L: number, RightEnd: number) { // T(N) = O(NlongN)
		let center;
		if (L < RightEnd) {
			center = Math.floor((L + RightEnd) / 2);
			this.mSort(A, TmpA, L, center);
			this.mSort(A, TmpA, center + 1, RightEnd);
			this.merge(A, TmpA, L, center + 1, RightEnd);
		}
	}
	// 结果放在A
	private merge(A: number[], TmpA: number[], L: number, R: number, RightEnd: number) {
		let leftEnd = R - 1; // 左边终点位置，假设左右两列挨着
		let temp = L; // 存放结果的数组的初始位置
		let numElements = RightEnd - L + 1;
		while(L <= leftEnd && R <= RightEnd) {
			if (A[L] <= A[R]) {
				TmpA[temp++] = A[L++];
			} else {
				TmpA[temp++] = A[R++];
			}
		}

		while(L <= leftEnd) {
			TmpA[temp++] = A[L++]; 
		}
		while(R <= RightEnd) {
			TmpA[temp++] = A[R++];
		}

		for(let i = 0; i < numElements; i++, RightEnd-- ) {
			A[RightEnd] = TmpA[RightEnd];
		}
	}
	// 结果放在TmpA
	private merge1(A: number[], TmpA: number[], L: number, R: number, RightEnd: number) {
		let leftEnd = R - 1; // 左边终点位置，假设左右两列挨着
		let temp = L; // 存放结果的数组的初始位置
		let numElements = RightEnd - L + 1;
		while(L <= leftEnd && R <= RightEnd) {
			if (A[L] <= A[R]) {
				TmpA[temp++] = A[L++];
			} else {
				TmpA[temp++] = A[R++];
			}
		}

		while(L <= leftEnd) {
			TmpA[temp++] = A[L++]; 
		}
		while(R <= RightEnd) {
			TmpA[temp++] = A[R++];
		}
	}
}