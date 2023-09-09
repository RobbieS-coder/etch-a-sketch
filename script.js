function initialiseGrid() {
	const gridContainer = document.querySelector(".grid-container");

	for (let i = 0; i < 16; i++) {
		const row = document.createElement("div");
		row.classList.add("row");

		for (let j = 0; j < 16; j++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			row.appendChild(tile);
			tile.addEventListener("mouseenter", (e) => {
				e.target.classList.add("hovered");
			})
		}

		gridContainer.appendChild(row);
	}
}

initialiseGrid();