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
	const newDimension = prompt("What do you want the new grid size to be?");

	const rows = document.querySelectorAll(".row");
	rows.forEach(row => {
		row.remove();
	});
	
	initialiseGrid(newDimension);
}

initialiseGrid(16);
addButtonEventListeners();