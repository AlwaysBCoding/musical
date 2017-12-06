class BufferLoader {

	constructor(context, urlList, callback) {
		this.context = context;
		this.urlList = urlList;
		this.onload = callback;
		this.bufferList = [];
		this.loadCount = 0;
	}

	loadBuffer(url, index) {
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";

		var loader = this;

		request.onload = function() {
			loader.context.decodeAudioData(
				request.response,
				(buffer) => {
					loader.bufferList[index] = buffer;
					if (++loader.loadCount === loader.urlList.length) {
						loader.onload(loader.bufferList);
					}
				},
				(error) => {
					console.log(`DECODEAUDIODATA CALLBACK ERROR`)
					console.log(error)
				}
			);
		}

		request.onerror = function() {
			alert('BufferLoader: XHR error');
		}

		request.send();
	}

	load() {
		for (var i = 0; i < this.urlList.length; ++i) {
			this.loadBuffer(this.urlList[i], i);
		}
	}

}

export default BufferLoader
