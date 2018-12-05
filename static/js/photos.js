define(['utils'], function(utils) {
	var appDiv = document.getElementById('photosapp');
	var thumbsDiv = document.getElementById('thumbs');
	var moreButton = document.getElementById('moreButton');
	moreButton.onclick = function() {
		createThumbs();
	}

	var thumbsPath = [];

	fetch('/photos')
	.then(res => res.json())
	.then(response => {
		thumbsPath = response;
		createThumbs();
	})
	.catch(err => {
		div.innerHTML = 'fetch error: ' + err;
	});

	var pageSize = 200;
	var currentIdx = 0;
	function createThumbs() {
		var i = 0;
		while (i < pageSize && currentIdx + i < thumbsPath.length) {
			var div = createThumb(thumbsPath[currentIdx + i]);
			i++;
		}

		currentIdx = currentIdx + i;
		if (currentIdx < thumbsPath.length) {
			moreButton.style.visibility = 'visible';
		} else {
			moreButton.style.visibility = 'hidden';
		}

	}

	function createThumb(thumbPath) {
		var div = document.createElement('div');
		div.className = 'thumb';
		var img = document.createElement('img');
		img.src = thumbPath;
		var a = document.createElement('a');
		var photoPath = thumbPath.replace('thumbs', 'photos');
		a.href = photoPath;
		a.onclick = function() {
			showPhoto(photoPath);
			return false;
		};
		a.appendChild(img);

		div.appendChild(a);
		thumbsDiv.appendChild(div);
		return div;
	}

	function showPhoto(photoPath) {
		var div = document.createElement('div');
		div.className = 'photo';
		var img = document.createElement('img');
		img.src = photoPath;
		div.onclick = function() {
			appDiv.removeChild(div);
		};
		div.appendChild(img);
		appDiv.appendChild(div);
	}
});
