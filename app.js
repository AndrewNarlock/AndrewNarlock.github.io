const blockButton = document.querySelector('.block-button');

blockButton.addEventListener('click', () => {
	buildBlock();
});

const buildBlock = function () {
	let inputElement = document.querySelector('.embed-input');
	let embedInput = inputElement.value;

	if (embedInput.includes('embed')) {
		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;

		let block = document.createElement('div');
		let frame = document.createElement('iframe');
		let deleteButton = document.createElement('button');

		frame.src = `${embedInput}`;
		block.classList.add('block');
		deleteButton.classList.add('delete-button');
		deleteButton.innerHTML = 'X';
		block.style.left = `150px`;
		block.style.top = `150px`;
		block.appendChild(frame);
		block.appendChild(deleteButton);
		document.body.appendChild(block);

		deleteButton.addEventListener('click', () => {
			block.remove();
		})

		block.addEventListener('mousedown', (e) => {
			isDragging = true;
			offsetX = block.offsetLeft - e.clientX;
			offsetY = block.offsetTop - e.clientY;
		});

		block.addEventListener('mouseup', () => {
			isDragging = false;

		});

		document.addEventListener('mousemove', (e) => {
			if (isDragging) {
				block.style.left = `${e.clientX + offsetX}px`;
				block.style.top = `${e.clientY + offsetY}px`;
			}
		});
		inputElement.value = '';
	} else {
		inputElement.value = '';
	}
}

