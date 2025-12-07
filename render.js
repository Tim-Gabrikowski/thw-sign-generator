function renderPreview(configuration) {
	console.log("Rendering preview with configuration:", configuration);

	// fill the main Area
	let mainArea = document.getElementById("mainArea");
	// Clear existing content
	mainArea.innerHTML = "";

	// Add blocks based on configuration

	if (configuration.blocks.persons.enabled) {
		let personsBlock = generatePersonsBlock(configuration.blocks.persons);
		mainArea.appendChild(personsBlock);
	}

	if (configuration.blocks.warning.enabled) {
		let warningBlock = generateWarningBlock(configuration.blocks.warning);
		mainArea.appendChild(warningBlock);
	}

	if (configuration.blocks.image.enabled) {
		let imageBlock = generateImageBlock(configuration.blocks.image);
		mainArea.appendChild(imageBlock);
	}
}

// Generates a table element representing the persons block
function generatePersonsBlock(persons) {
	let table = document.createElement("table");
	table.classList.add("persons");
	persons.entries.forEach((entry) => {
		let row = document.createElement("tr");

		let nameCell = document.createElement("td");
		nameCell.textContent = entry.name;
		nameCell.classList.add("name");
		if (entry.important) {
			nameCell.classList.add("important");
		}
		row.appendChild(nameCell);

		let positionCell = document.createElement("td");
		positionCell.textContent = entry.position;
		positionCell.classList.add("position");
		row.appendChild(positionCell);

		table.appendChild(row);
	});
	return table;
}

// Generates a div element representing the warning block
function generateWarningBlock(warning) {
	let warningDiv = document.createElement("div");
	warningDiv.classList.add("warning");

	let heading = document.createElement("h2");
	heading.textContent = warning.heading;
	warningDiv.appendChild(heading);

	let text = document.createElement("p");
	text.textContent = warning.text;
	warningDiv.appendChild(text);

	return warningDiv;
}

// Generates a div element representing the image block
function generateImageBlock(image) {
	let imageDiv = document.createElement("div");
	imageDiv.classList.add("image");

	let img = document.createElement("img");
	img.src = image.src;
	img.alt = "Bild";
	imageDiv.appendChild(img);

	return imageDiv;
}
