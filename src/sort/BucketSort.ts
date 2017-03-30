import SortImp from './SortImp';
export default class BucketSort implements SortImp {
	public sort(A: number[], n: number) {
		let count : number[][]= [];
		for(let i = 0; i < n; i++) {
			let element = A[i];
			count[element] = count[element] || [];
			count[element].push(element);
		}
		
		let index = 0;
		for(let i = 0; i < count.length; i++) {
			let elements = count[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					A[index++] = elements[j];
				}
			}
		}
	}
}