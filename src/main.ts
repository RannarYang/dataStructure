// import SortFactory from './sort/SortFactory';
// import SortImp from './sort/SortImp';
// import SortType from './sort/SortType';

// import RadixSort from './sort/RadixSort';

// import Heap from './tree/Heap';

// let arr = [3, 2, 6, 8, 99, 13, 26, 35, 111, 222, 134, 456];

// let sortObj :SortImp = SortFactory.getSortObj(SortType.INSERTION_SORT);
// sortObj.sort(arr, arr.length);

// let heap = new Heap();
// for(let i = 0; i < arr.length; i++) {
// 	heap.insert(arr[i]);
// }
// heap.deleteMax();
// heap.build(arr);

// let selectionSort = SortFactory.getSortObj(SortType.SELECTION_SORT);
// selectionSort.sort(arr, arr.length);

// let heapSort = SortFactory.getSortObj(SortType.HEAP_SORT);
// heapSort.sort(arr, arr.length);

// let mergeSort = SortFactory.getSortObj(SortType.HEAP_SORT);
// mergeSort.sort(arr, arr.length);

// let quickSort = SortFactory.getSortObj(SortType.QUICK_SORT);
// quickSort.sort(arr, arr.length);

// let bucketSort = SortFactory.getSortObj(SortType.BUCKET_SORT);
// bucketSort.sort(arr, arr.length);
// RadixSort.LSD(arr, arr.length, 3);

// let cardArr = ['diamond-1','club-3', 'diamond-2','diamond-3','heart-4','spade-2', 'spade-12', 'spade-13'];
// RadixSort.LSD1(cardArr);
// console.log(cardArr);

// 有向图 矩阵
// import GraphMatrix from './graph/GraphMatrix';
// // let graphData : number[][]= [
// // 	[0, 1, 1, 1, 0, 0],
// // 	[1, 0, 0, 0, 1, 0],
// // 	[1, 0, 0, 0, 1, 1],
// // 	[1, 0, 0, 0, 0, 1],
// // 	[0, 1, 1, 0, 0, 1],
// // 	[0, 0, 1, 1, 1, 0]
// // ];
// let graphData : number[][]= [
// 	[0, 0, 0, 0, 1, 1, 0],
// 	[0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 1, 0, 0],
// 	[0, 0, 0, 0, 1, 0, 0],
// 	[1, 0, 1, 1, 0, 0, 0],
// 	[1, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0]
// ];
// let graph = new GraphMatrix(graphData, 7);
// graph.DFSTraverse();

// 有向图 矩阵
// import GraphMatrix from './graph/GraphMatrix';
// // let graphData : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// // console.log('graphData.length:', graphData.length);
// let graph = new GraphMatrix();
// graph.create([[0, 5, 100],[0, 4, 30],[0, 2, 10], [4, 5, 60], [4, 3, 20], [3, 5, 10], [2, 3, 50], [1, 2, 5]], 6)
// // graph.DFSTraverse();
// // graph.BFSTraverse(0);
// // graph.BFSTraverseByLayer(0, 1);
// // graph.shortestPath_DIJ(0);
// graph.shortestPath_Floyd();

// 有向图
// import GraphMatrix from './graph/GraphMatrix';
// let graph = new GraphMatrix();
// // graph.create([[0, 1, 1], [0, 2, 1], [0, 3, 1], [2, 1, 1], [2, 4, 1], [3, 4, 1], [5, 3, 1], [5, 4, 1]], 6);
// // graph.topSort();
// // graph.prim();
// graph.create([[0, 1, 6], [0, 2, 4], [0, 3, 5], [1, 4, 1], [2, 4, 1], [3, 5, 2], [4, 6, 9], [4, 7, 7], [5, 7, 4], [6, 8, 2], [7, 8, 4]], 9);
// // graph.criticalPath();
// 无向图
// import UnGraphMatrix from './graph/UnGraphMatrix';
// let graph = new UnGraphMatrix();
// graph.create([[0, 1, 2], [0, 2, 4], [0, 3, 1], [1, 3, 3], [1, 4, 10], [2, 3, 2], [3, 4, 7], [2, 5, 5], [3, 5, 8], [3, 6, 4], [4, 6, 6], [5, 6, 1]], 7);
// graph.prim();

// tree
// import Tree from './tree/Tree';
// let tree = new Tree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);

// tree.postOrderTraversal();
// let height = tree.postOrderGetHeight();
// console.log(height);
// console.log(tree.delete(25));
// search
// import BinarySearch from './search/BinarySearch';
// let result = BinarySearch.search([1,2,3,4], 1);
// console.log(result);

// import HuffmanTree from './tree/HuffmanTree';
// let huffmantree = new HuffmanTree([1,6,3,5,4]);

// 并查集
// import UnionFind from './tree/UnionFind';
// let unionFind = new UnionFind([['string' + 1, 'string' + 2,3], [4], [5]]);
// unionFind.union(3, 5);

// import UnionFindNoData from './tree/UnionFindNoData';
// let unionFind = new UnionFindNoData([[0,1,2],[3,4],[5]]);
// unionFind.union(1, 4);
// unionFind.find(4);
// unionFind.union(1, 4);
// unionFind.union(3, 5);

// 最大堆 最小堆
import MinHeap from './tree/MinHeap';
let maxHeap = new MinHeap();
maxHeap.build([3, 4, 1, 5, 6, 6, 99, 33]);
maxHeap.insert(100);
for(let i = 0; i < 11; i++) {
	maxHeap.delete();
}
maxHeap.insert(100);
maxHeap.insert(99);
maxHeap.delete();
maxHeap.delete();
maxHeap.insert(98);
// 最小堆