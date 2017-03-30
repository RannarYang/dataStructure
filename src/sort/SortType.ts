export default class SortType {
	public static BUBBLE_SORT :SortType = new SortType(0);
	public static INSERTION_SORT :SortType = new SortType(1);
	public static SELECTION_SORT :SortType = new SortType(2);
	public static HEAP_SORT: SortType = new SortType(3);
	public static MERGE_SORT: SortType = new SortType(4);
	public static QUICK_SORT: SortType = new SortType(5);
	private constructor(code: number) {

	}
}