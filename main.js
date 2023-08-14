// PLAN
// Write a function that onclick adds the total columns selected and inputs them in a 'totals' column. (edit I have changed this to using variables with hard coded values since the values never change)
// It should add up each 'section total' and then an overall weight total
// Then it should have this formula 12 - overall weight total

createFormula();

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

	// Event listeners for the Selection section
	selectionItems.forEach((item) => {
		const element = document.getElementById(item.id);
		element.addEventListener("click", () => {
			if (!item.added) {
				item.added = true;
				element.style.backgroundColor = "#e6e0e0";
				updateSelectionTotal();
				updateOverallTotal();

				const otherItemId = getOtherItemId(item.id);
				const otherItemElement = document.getElementById(otherItemId);
				if (otherItemElement) {
					selectionItems.find(
						(otherItem) => otherItem.id === otherItemId
					).added = false;
					otherItemElement.style.backgroundColor = "#cdb7db";
				}

				// Check for tent-sleepingbag combination
				if (
					item.id === "light-tent-value" ||
					item.id === "mountain-tent-value"
				) {
					const sleepingBagId =
						item.id === "light-tent-value"
							? "winter-sleepingbag-value"
							: "summer-sleepingbag-value";
					const sleepingBagElement = document.getElementById(sleepingBagId);
					if (sleepingBagElement) {
						sleepingBagElement.style.backgroundColor = "";
						selectionItems.find(
							(sleepingBagItem) => sleepingBagItem.id === sleepingBagId
						).added = false;
					}
				}
			} else {
				item.added = false;
				element.style.backgroundColor = "";
				updateSelectionTotal();
				updateOverallTotal();
			}
		});
	});
	// Event listeners for the Extras section
	extrasItems.forEach((item) => {
		const element = document.getElementById(item.id);
		element.addEventListener("click", () => {
			if (!item.added) {
				item.added = true;
				element.style.backgroundColor = "#e6e0e0";
				updateExtrasTotal();
				updateOverallTotal();
			} else if (item.added) {
				item.added = false;
				element.style.backgroundColor = "";
				updateExtrasTotal();
				updateOverallTotal();
			}
		});
	});
	// Function to update the Selection section total
	function updateSelectionTotal() {
		const selectionTotalElement =
			document.getElementById("selections-total").lastElementChild;
		const selectedItemsTotal = selectionItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		selectionTotalElement.textContent = selectedItemsTotal.toString();
	}
	// Function to update the Extras section total
	function updateExtrasTotal() {
		const extrasTotalElement =
			document.getElementById("extras-total").lastElementChild;
		const extrasItemsTotal = extrasItems.reduce(
			(total, item) => total + (item.added ? item.value : 0),
			0
		);
		extrasTotalElement.textContent = extrasItemsTotal.toString();
	}
	// Function to update the overall total & calculate the move speed
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
		overallTotalElement.textContent = overallTotal;
	}

	function getOtherItemId(itemId) {
		if (itemId === "light-tent-value") return "mountain-tent-value";
		if (itemId === "mountain-tent-value") return "light-tent-value";
		if (itemId === "summer-sleepingbag-value")
			return "winter-sleepingbag-value";
		if (itemId === "winter-sleepingbag-value")
			return "summer-sleepingbag-value";
	}
}

createFormula();
