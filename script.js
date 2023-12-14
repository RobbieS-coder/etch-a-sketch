let gridSize = 16;
let currentColor = "black";

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
				e.target.style.backgroundColor = currentColor;
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

function addButtonEventListeners() {
	gridSizeButton = document.querySelector(".grid-size");
	resetButton = document.querySelector(".reset");
	changeColourButton = document.querySelector(".change-colour");

	gridSizeButton.addEventListener("click", () => {
		changeGridSize();
	})

	resetButton.addEventListener("click", () => {
		resetGrid();
	})

	changeColourButton.addEventListener("click", () => {
		changeColour();
	})
}

function changeGridSize() {
	let newDimension = prompt(`What do you want the new grid size to be?\nThe max grid size is 100.\nCurrent grid size: ${gridSize}x${gridSize}`);

	if (newDimension === null) {
		return;
	}

	while (!testDimensionValidity(newDimension)) {
		newDimension = prompt(`${newDimension} is not valid. Please enter an integer.`);
		if (newDimension === null) {
			return;
		}
	}

	gridSize = Math.min(parseInt(newDimension), 100);

	const rows = document.querySelectorAll(".row");
	rows.forEach(row => {
		row.remove();
	});

	initialiseGrid(gridSize);
}

function changeColour() {
	let newColour = prompt("What do you want the colour to be? It must be a valid colour such as a colour keyword, hex or rgb.\ne.g. red, #ff0000 or rgb(256, 0, 0)");

	if (newColour === null) {
		return;
	}

	while (!testColourValidity(newColour)) {
		newColour = prompt(`${newColour} is not valid. Please enter an valid colour.`);
		if (newColour === null) {
			return;
		}
	}

	currentColor = newColour;
}

function testDimensionValidity(newDimension) {
	return newDimension !== undefined &&
		Number.isInteger(parseInt(newDimension, 10));
}

function testColourValidity(newColour) {
	const span = document.createElement("span");
	span.style.color = newColour;
	return span.style.color !== "";
}

function resetGrid() {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach(tile => {
		tile.style.backgroundColor = "white";
	});
}

initialiseGrid(gridSize);
addButtonEventListeners();