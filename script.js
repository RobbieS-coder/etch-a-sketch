let gridSize = 16;

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

	const tiles = document.querySelectorAll(".tile");
	if (gridDimensions > 60) {
		tiles.forEach(tile => {
			tile.style.border = "1px solid black";
			gridContainer.style.border = "1px solid black";
		});
	} else {
		tiles.forEach(tile => {
			tile.style.border = "2px solid black";
			gridContainer.style.border = "2px solid black";
		});
	}
}

function addButtonEventListeners () {
	gridSizeButton = document.querySelector(".grid-size");
	resetButton = document.querySelector(".reset");

	gridSizeButton.addEventListener("click", () => {
		changeGridSize();
	})

	resetButton.addEventListener("click", () => {
		resetGrid();
	})
}

function changeGridSize() {
	let newDimension = prompt(`What do you want the new grid size to be?\nThe max grid size is 100.\nCurrent grid size: ${gridSize}x${gridSize}`);

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
	gridSize = Math.min(gridSize, 100);

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

function resetGrid() {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach(tile => {
		tile.classList.remove("hovered");
	});
}

initialiseGrid(gridSize);
addButtonEventListeners();