import SortType from './SortType';
import SortImp from './SortImp';
import BubbleSort from './BubbleSort';
import InsertionSort from './InsertionSort';
import SelectionSort from './SelectionSort';
import HeapSort from './HeapSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';

export default class SortFactory {
	public static getSortObj(sortType: SortType): SortImp {
		switch (sortType) {

			case SortType.BUBBLE_SORT:
				return new BubbleSort();

			case SortType.INSERTION_SORT:
				return new InsertionSort();

			case SortType.SELECTION_SORT:
				return new SelectionSort();

			case SortType.HEAP_SORT:
				return new HeapSort();

			case SortType.MERGE_SORT:
				return new MergeSort();

			case SortType.QUICK_SORT:
				return new QuickSort();
		}
		return null;
	}
}