function getCurrentConfiguration() {
	let generalInfo = getGeneralInfo();
	return {
		roomNumber: generalInfo.roomNumber,
		roomName: generalInfo.roomName,
		blocks: {
			persons: {
				enabled: true,
				entries: [
					{
						name: "Tim Gabrikowski",
						position: "BFDler",
						important: true,
					},
				],
			},
			warning: getWarningBlockInfo(),
			image: {
				enabled: true,
				src: "./logo/settings.svg",
			},
		},
	};
}

const personBlockEnableInput = document.getElementById("displayPersonsBlock");
const warningBlockEnableInput = document.getElementById("displayWarningBlock");
const imageBlockEnableInput = document.getElementById("displayImageBlock");

function getGeneralInfo() {
	return {
		roomNumber: document.getElementById("roomNumberInput").value || "R 12",
		roomName:
			document.getElementById("roomNameInput").value || "Verwaltungsbüro",
	};
}
function getWarningBlockInfo() {
	return {
		enabled: warningBlockEnableInput.checked || true,
		heading:
			document.getElementById("warningHeadingInput").value || "Achtung",
		text:
			document.getElementById("warningTextInput").value || "Warnungstext",
	};
}
