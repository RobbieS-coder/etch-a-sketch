let gridSize;

function initialiseGrid(gridDimensions) {
	const gridContainer = document.querySelector(".grid-container");

	for (let i = 0; i < gridDimensions; i++) {
		const row = document.createElement("div");
		row.classList.add("row");

		for (let j = 0; j < gridDimensions; j++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			row.appendChild(tile);
			tile.addEventListener("mouseenter", (e) => {
				e.target.classList.add("hovered");
			});
		}

		gridContainer.appendChild(row);
	}
}

function addButtonEventListeners () {
	gridSizeButton = document.querySelector(".grid-size");

	gridSizeButton.addEventListener("click", () => {
		changeGridSize();
	})
}

function changeGridSize() {
	let newDimension = prompt("What do you want the new grid size to be?");

	if (newDimension === null) {
		return;
	}

	while (!testValidity(newDimension)) {
		newDimension = prompt(`${newDimension} is not valid. Please enter an integer.`);;
		if (newDimension === null) {
				return;
		}
	}
	
	gridSize = parseInt(newDimension, 10);

	const rows = document.querySelectorAll(".row");
	rows.forEach(row => {
		row.remove();
	});
	
	initialiseGrid(gridSize);
}

function testValidity(newDimension) {
	return newDimension !== undefined &&
	Number.isInteger(parseInt(newDimension, 10));
}


initialiseGrid(16);
addButtonEventListeners();