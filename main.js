console.log("hello, world");

// PLAN
// Write a function that onclick adds the total columns selected and inputs them in a 'totals' column.
// It should add up each 'section total' and then an overall weight total
// Then it should have this formula 12 - overall weight total

function createFormula() {
	const basicsTotal = 5;
	const lightweightTent = 1;
	const mountainTent = 1.5;
	const summerSleepingBag = 1;
	const winterSleepingBag = 1.5;
	const water = 0.5;
	const extraFood = 0.5;
	const accessories = 0.5;

	// Created an array of items with their properties
	const items = [
		{ id: "light-tent-value", value: 1, added: false },
		{ id: "mountain-tent-value", value: 1.5, added: false },
		{ id: "summer-sleepingbag-value", value: 1, added: false },
		{ id: "winter-sleepingbag-value", value: 1.5, added: false },
		{ id: "water-value", value: 0.5, added: false },
		{ id: "extra-food-value", value: 0.5, added: false },
		{ id: "accessories-value", value: 0.5, added: false },
	];

	// Add event listeners to each item
	items.forEach((item) => {
		const element = document.getElementById(item.id);
		element.addEventListener("click", () => {
			if (!item.added) {
				item.added = true;
				updateSelectionTotal();
				updateOverallTotal();
			}
		});
	});

	function updateSelectionTotal() {
		const selectionTotalElement =
			document.getElementById("selections-total").lastElementChild;
		const selectedItemsTotal = items.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		selectionTotalElement.textContent = selectedItemsTotal.toString();
	}

	function updateOverallTotal() {
		const selectionsTotal = items.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		const extrasTotal = water + extraFood + accessories;
		const overallTotal = basicsTotal + selectionsTotal + extrasTotal;

		const moveSpeed = 12 - overallTotal;
		const moveSpeedText = `${moveSpeed} + dice throw`;
		const moveSpeedTotal = document.getElementById("move-speed-total");
		moveSpeedTotal.textContent = moveSpeedText;

		const overallTotalElement = document.getElementById("overall-total");
		overallTotalElement.textContent = overallTotal.toFixed(2);
	}
}

createFormula();

function selectValue(elementId) {
	const value = parseFloat(document.getElementById(elementId).textContent);
	console.log(value);
}
