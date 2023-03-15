const blockButton = document.querySelector('.block-button');

blockButton.addEventListener('click', () => {
	buildBlock();
});

const buildBlock = function () {
	let inputElement = document.querySelector('.embed-input');
	let embedInput = inputElement.value;

	if (embedInput.includes('youtube.com/embed')) {
		let isResizing = false;
		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;

		let block = document.createElement('div');
		let layer = document.createElement('div');
		let frame = document.createElement('iframe');
		let deleteButton = document.createElement('button');
		let resizer = document.createElement('button');
		let grabber = document.createElement('div');

		frame.src = `${embedInput}`;

		block.classList.add('block');
		layer.classList.add('layer');
		frame.classList.add('frame');
		resizer.classList.add('resizer');
		deleteButton.classList.add('delete-button');
		grabber.classList.add('grabber');

		deleteButton.innerHTML = 'X';

		block.appendChild(frame);
		block.appendChild(grabber);
		block.appendChild(deleteButton);
		block.appendChild(layer);

		document.body.appendChild(resizer);
		document.body.appendChild(block);

		resizer.style.left = `${block.clientWidth + block.offsetLeft - resizer.clientWidth + 2}px`;
		resizer.style.top = `${block.clientHeight + block.offsetTop - resizer.clientHeight + 2}px`;


		deleteButton.addEventListener('click', () => {
			block.remove();
			resizer.remove();
		});

		resizer.addEventListener('mousedown', (e) => {
			isResizing = true;
		});

		resizer.addEventListener('mouseup', (e) => {
			isResizing = false;
		});

		block.addEventListener('mousedown', (e) => {
			isDragging = true;
			offsetX = block.offsetLeft - e.clientX;
			offsetY = block.offsetTop - e.clientY;
		});

		block.addEventListener('mouseup', () => {
			layer.style.display = 'none';
			isDragging = false;
			isResizing = false;
		});

		document.addEventListener('mouseup', () => {
			layer.style.display = 'none';
			isResizing = false;
		});

		document.addEventListener('mousemove', (e) => {
			if (isDragging) {
				layer.style.display = 'flex';
				block.style.left = `${e.clientX + offsetX}px`;
				block.style.top = `${e.clientY + offsetY}px`;
				resizer.style.left = `${block.clientWidth + block.offsetLeft - resizer.clientWidth + 2}px`;
				resizer.style.top = `${block.clientHeight + block.offsetTop - resizer.clientHeight + 2}px`;
			}

			if (isResizing) {
				layer.style.display = 'flex';
				block.style.width = `${e.clientX - block.offsetLeft}px`;
				block.style.height = `${e.clientY - block.offsetTop}px`;
				resizer.style.left = `${block.clientWidth + block.offsetLeft - resizer.clientWidth + 2}px`;
				resizer.style.top = `${block.clientHeight + block.offsetTop - resizer.clientHeight + 2}px`;
			}
		});


	} else {
		inputElement.value = '';
	}
}
