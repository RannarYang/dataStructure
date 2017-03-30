export default class BinarySearch { 
	public static search(list : number[] = [], k : number) { // O(logN)
		let left = 0;
		let right = list.length - 1;
		let noFound = -1;
		let mid;
		while(left <= right) {
			mid = Math.floor((left + right) / 2);
			if(k < list[mid]) right = mid - 1;
			else if(k > list[mid]) left = mid + 1;
			else return mid;
		}

		return noFound;

	}
}