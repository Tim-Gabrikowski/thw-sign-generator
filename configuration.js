let persons = [
	{ name: "Max Mustermann", position: "Entwickler", important: true },
	{ name: "Erika Musterfrau", position: "Designer", important: false },
	{ name: "Hans Beispiel", position: "Manager", important: false },
];

function getCurrentConfiguration() {
	let generalInfo = getGeneralInfo();
	return {
		roomNumber: generalInfo.roomNumber,
		roomName: generalInfo.roomName,
		blocks: {
			persons: getPersonsBlockInfo(),
			warning: getWarningBlockInfo(),
			image: getImageBlockInfo(),
		},
	};
}

const personBlockEnableInput = document.getElementById("displayPersonsBlock");
const warningBlockEnableInput = document.getElementById("displayWarningBlock");
const imageBlockEnableInput = document.getElementById("displayImageBlock");

personBlockEnableInput.addEventListener("change", updateConfigurationDisplay);
warningBlockEnableInput.addEventListener("change", updateConfigurationDisplay);
imageBlockEnableInput.addEventListener("change", updateConfigurationDisplay);

function updateConfigurationDisplay() {
	if (personBlockEnableInput.checked) {
		document
			.getElementById("personsBlockSettings")
			.classList.remove("disabled");
	} else {
		document
			.getElementById("personsBlockSettings")
			.classList.add("disabled");
	}

	if (warningBlockEnableInput.checked) {
		document
			.getElementById("warningBlockSettings")
			.classList.remove("disabled");
	} else {
		document
			.getElementById("warningBlockSettings")
			.classList.add("disabled");
	}

	if (imageBlockEnableInput.checked) {
		document
			.getElementById("imageBlockSettings")
			.classList.remove("disabled");
	} else {
		document.getElementById("imageBlockSettings").classList.add("disabled");
	}

	if (imageSelectInput.files.length > 0) {
		document
			.getElementById("imageSelectLabel")
			.classList.add("fileSelected");
	} else {
		document
			.getElementById("imageSelectLabel")
			.classList.remove("fileSelected");
	}

	renderPersonList();
}

function getGeneralInfo() {
	return {
		roomNumber: document.getElementById("roomNumberInput").value,
		roomName: document.getElementById("roomNameInput").value,
	};
}
function getWarningBlockInfo() {
	return {
		enabled: warningBlockEnableInput.checked,
		heading: document.getElementById("warningHeadingInput").value,
		text: document.getElementById("warningTextInput").value,
	};
}

function getImageBlockInfo() {
	return {
		enabled:
			imageBlockEnableInput.checked && imageSelectInput.files.length > 0,
		file: document.getElementById("imageSelectInput").files[0],
	};
}
const imageSelectInput = document.getElementById("imageSelectInput");
imageSelectInput.addEventListener("change", updateConfigurationDisplay);

function getPersonsBlockInfo() {
	return {
		enabled: personBlockEnableInput.checked,
		entries: persons,
	};
}

function addPerson(name, position, important) {
	persons.push({
		name: name,
		position: position,
		important: important,
	});
}
// listen to add person button

const addPersonButton = document.getElementById("addPersonButton");
addPersonButton.addEventListener("click", () => {
	let nameInput = document.getElementById("personNameInput");
	let positionInput = document.getElementById("personPositionInput");
	let importantInput = document.getElementById("personImportantInput");

	addPerson(nameInput.value, positionInput.value, importantInput.checked);

	nameInput.value = "";
	positionInput.value = "";
	importantInput.checked = false;

	renderPersonList();
});

function renderPersonList() {
	let personListDiv = document.getElementById("personList");
	// Clear existing content
	personListDiv.innerHTML = "";

	persons.forEach((person, index) => {
		let entryDiv = document.createElement("div");
		entryDiv.classList.add("entry");

		let textDiv = document.createElement("div");

		let nameElem = document.createElement("div");
		nameElem.classList.add("name");
		nameElem.textContent = person.name;
		if (person.important) {
			nameElem.classList.add("important");
		}
		textDiv.appendChild(nameElem);

		let positionElem = document.createElement("div");
		positionElem.classList.add("position");
		positionElem.textContent = person.position;
		textDiv.appendChild(positionElem);

		let buttons = document.createElement("div");
		buttons.classList.add("buttons");

		// Add delete button
		let deleteButton = document.createElement("button");

		let deleteImage = document.createElement("img");
		deleteImage.src = "./img/delete.svg";
		deleteImage.alt = "Löschen";
		deleteButton.appendChild(deleteImage);

		deleteButton.addEventListener("click", () => {
			persons.splice(index, 1);
			renderPersonList();
		});
		buttons.appendChild(deleteButton);

		// if not first, add up button
		let upButton = document.createElement("button");

		let upImage = document.createElement("img");
		upImage.src = "./img/arrow_up.svg";
		upImage.alt = "Nach oben";
		upButton.appendChild(upImage);

		if (index > 0) {
			upButton.addEventListener("click", () => {
				[persons[index - 1], persons[index]] = [
					persons[index],
					persons[index - 1],
				];
				renderPersonList();
			});
		} else {
			upButton.disabled = true;
		}
		buttons.appendChild(upButton);

		// if not last, add down button
		let downButton = document.createElement("button");

		let downImage = document.createElement("img");
		downImage.src = "./img/arrow_down.svg";
		downImage.alt = "Nach unten";
		downButton.appendChild(downImage);
		if (index < persons.length - 1) {
			downButton.addEventListener("click", () => {
				[persons[index + 1], persons[index]] = [
					persons[index],
					persons[index + 1],
				];
				renderPersonList();
			});
		} else {
			downButton.disabled = true;
		}
		buttons.appendChild(downButton);

		entryDiv.appendChild(textDiv);
		entryDiv.appendChild(buttons);

		personListDiv.appendChild(entryDiv);
	});
}
