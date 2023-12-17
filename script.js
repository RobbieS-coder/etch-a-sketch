let gridSize = 16;
let previousColour = "";
let currentColour = "black";
let isEraserActive = false;
let eraserButton;

function initialiseGrid(gridDimensions) {
	const gridContainer = document.querySelector(".grid-container");

	let isMouseDown = false;

	for (let i = 0; i < gridDimensions; i++) {
		const row = document.createElement("div");
		row.classList.add("row");

		for (let j = 0; j < gridDimensions; j++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			row.appendChild(tile);

			tile.addEventListener("mousedown", (e) => {
				e.preventDefault();
			});

			tile.addEventListener("mousemove", (e) => {
				if (isMouseDown) {
					e.target.style.backgroundColor = currentColour;
				}
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

	document.addEventListener("mousedown", () => {
		isMouseDown = true;
	});

	document.addEventListener("mouseup", () => {
		isMouseDown = false;
	});
}

function addButtonEventListeners() {
	const gridSizeButton = document.querySelector(".grid-size");
	const resetButton = document.querySelector(".reset");
	const changeColourButton = document.querySelector(".change-colour");
	eraserButton = document.querySelector(".eraser");

	gridSizeButton.addEventListener("click", () => {
		changeGridSize();
	});

	resetButton.addEventListener("click", () => {
		resetGrid();
	});

	changeColourButton.addEventListener("click", () => {
		changeColour();
	});

	eraserButton.addEventListener("click", () => {
		toggleEraser();
	});
}

function changeGridSize() {
	if (isEraserActive === true) {
		toggleEraser();
	}

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
	if (isEraserActive === true) {
		toggleEraser();
	}

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

	currentColour = newColour;
}

function testDimensionValidity(newDimension) {
	return newDimension !== undefined &&
		Number.isInteger(parseInt(newDimension, 10));
}

function testColourValidity(newColour) {
	const div = document.createElement("div")
	div.style.color = newColour;
	return div.style.color !== "";
}

function resetGrid() {
	if (isEraserActive === true) {
		toggleEraser();
	}

	const tiles = document.querySelectorAll(".tile");
	tiles.forEach(tile => {
		tile.style.backgroundColor = "white";
	});
}

function toggleEraser() {
	isEraserActive = !isEraserActive;
	eraserButton.classList.toggle("active");

	if (isEraserActive) {
		previousColour = currentColour
		currentColour = "white";
	} else {
		currentColour = previousColour;
	}
}

initialiseGrid(gridSize);
addButtonEventListeners();