console.log("hello, world");

// PLAN
// Write a function that onclick adds the total columns selected and inputs them in a 'totals' column. (edit I have changed this to using variables with hard coded values since the values never change)
// It should add up each 'section total' and then an overall weight total
// Then it should have this formula 12 - overall weight total

function createFormula() {
	const basicsTotal = 5;

	// Created an array of items with their properties
	const selectionItems = [
		{ id: "light-tent-value", value: 1, added: false },
		{ id: "mountain-tent-value", value: 1.5, added: false },
		{ id: "summer-sleepingbag-value", value: 1, added: false },
		{ id: "winter-sleepingbag-value", value: 1.5, added: false },
	];

	const extrasItems = [
		{ id: "water-value", value: 0.5, added: false },
		{ id: "extra-food-value", value: 0.5, added: false },
		{ id: "accessories-value", value: 0.5, added: false },
	];

	// Add event listeners to each item
	selectionItems.forEach((item) => {
		const element = document.getElementById(item.id);
		element.addEventListener("click", () => {
			if (!item.added) {
				item.added = true;
				updateSelectionTotal();
				updateOverallTotal();
			}
		});
	});

	// Add event listeners to each item
	extrasItems.forEach((item) => {
		const element = document.getElementById(item.id);
		element.addEventListener("click", () => {
			if (!item.added) {
				item.added = true;
				updateExtrasTotal();
				updateOverallTotal();
			}
		});
	});

	function updateSelectionTotal() {
		const selectionTotalElement =
			document.getElementById("selections-total").lastElementChild;
		const selectedItemsTotal = selectionItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		selectionTotalElement.textContent = selectedItemsTotal.toString();
	}

	function updateExtrasTotal() {
		const extrasTotalElement =
			document.getElementById("extras-total").lastElementChild;
		const extrasItemsTotal = extrasItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		extrasTotalElement.textContent = extrasItemsTotal.toString();
	}

	function updateOverallTotal() {
		const selectionsTotal = selectionItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		const extrasTotal = extrasItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
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
