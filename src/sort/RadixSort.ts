/// 基数排序
export default class RadixSort {
	// 次位优先 least significant digit
	public static LSD(A: number[], n: number, digit: number = 3) {
		let nowBucket : number[][] = [];
		for(let i = 0; i < n; i++) {
			let pos = A[i] % 10;
			nowBucket[pos] = nowBucket[pos] || [];
			nowBucket[pos].push(A[i]);
		}

		for (let i = 2; i <= digit; i++) {
			let lastBucket = nowBucket;
			nowBucket = [];
			for(let j = 0; j < lastBucket.length; j++) {
				let elements = lastBucket[j];
				if(elements && elements.length) {
					for(let k = 0; k < elements.length; k++) {
						let pos = Math.floor(elements[k] % Math.pow(10, i) / Math.pow(10, i-1));
						nowBucket[pos] = nowBucket[pos] || [];
						nowBucket[pos].push(elements[k]);
					}
				}
			}
		}

		// 导回到数组A
		let index = 0;
		for(let i = 0; i < nowBucket.length; i++) {
			let elements = nowBucket[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					A[index++] = elements[j];
				}
			}
		}
	}
	// 多关键字的排序
	// let cardArr = ['diamond-1','club-3','heart-4','spade-2', 'spade-12', 'spade-13'];
	public static LSD1(A: string[]){
		let correspond = {diamond: 1, club: 2, heart: 3, spade: 4};
		// 建立4个花色桶
		let typeBucket: string[][] = [];
		for(let i = 0; i < A.length; i++) {
			let card = A[i];
			let cardType = (A[i].split('-'))[0];
			let cardTypeNum = correspond[cardType];
			typeBucket[cardTypeNum] = typeBucket[cardTypeNum] || [];
			typeBucket[cardTypeNum].push(card);
		}

		// 建立4个花色桶
		let numBucket: string[][] = []
		for(let i = 1; i <= typeBucket.length; i++) {
			let elements = typeBucket[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					let card = elements[j];
					let cNum = parseInt((card.split('-'))[1]);
					numBucket[cNum] = numBucket[cNum] || [];
					numBucket[cNum].push(card);
				}
			}
		}
		// 输出
		let index = 0;
		for(let i = 1; i <= numBucket.length; i++) {
			let elements = numBucket[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					A[index++] = elements[j];
				}
			}
		}
	}

	public static LSD2(A: string[]){
		let correspond = {diamond: 1, club: 2, heart: 3, spade: 4};
		// 建立13个个数桶
		let numBucket: string[][] = [];
		for(let i = 0; i < A.length; i++) {
			let card = A[i];
			let cNum = parseInt((A[i].split('-'))[1]);
			numBucket[cNum] = numBucket[cNum] || [];
			numBucket[cNum].push(card);
		}

		// 建立4个花色桶
		let typeBucket: string[][] = []
		for(let i = 1; i <= numBucket.length; i++) {
			let elements = numBucket[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					let card = elements[j];
					let cardType = (card.split('-'))[0];
					let cardTypeNum = correspond[cardType];
					typeBucket[cardTypeNum] = typeBucket[cardTypeNum] || [];
					typeBucket[cardTypeNum].push(card);
				}
			}
		}

		// 输出
		let index = 0;
		for(let i = 1; i <= typeBucket.length; i++) {
			let elements = typeBucket[i];
			if(elements && elements.length) {
				for(let j = 0; j < elements.length; j++) {
					A[index++] = elements[j];
				}
			}
		}
	}
}