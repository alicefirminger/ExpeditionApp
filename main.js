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

	selectionItems.forEach((item) => {
		// Loop through each selection item
		const element = document.getElementById(item.id);
		// Get the HTML element corresponding to the current item's ID
		element.addEventListener("click", () => {
			// Add a click event listener to the element

			console.log(`Clicked on ${item.id}`);
			// Log the ID of the clicked item to the console

			const otherItemId = getOtherItemInGroup(item.id);
			// Get the ID of the other item in the same "or" group

			if (!item.added) {
				// If the current item is not already added

				console.log(`Adding ${item.id}`);
				// Log that the current item is being added

				item.added = true;
				// Set the added property of the current item to true
				element.style.backgroundColor = "#e6e0e0";
				// Change the background color of the element to indicate selection

				deselectOtherItemInGroup(otherItemId);
				// Deselect the other item in the same group
			} else {
				// If the current item is already added

				console.log(`Removing ${item.id}`);
				// Log that the current item is being removed

				item.added = false;
				// Set the added property of the current item to false
				element.style.backgroundColor = "";
				// Remove the background color to indicate deselection
				element.style.textDecoration = "";
				// Remove any text decoration (if added before)
			}

			updateSelectionTotal();
			// Update the selection total displayed on the page
			updateOverallTotal();
			// Update the overall total and move speed displayed on the page
		});
	});

	function getOtherItemInGroup(itemId) {
		// Function to get the ID of the other item in the same "or" group
		switch (itemId) {
			case "light-tent-value":
				return "mountain-tent-value";
			case "mountain-tent-value":
				return "light-tent-value";
			case "summer-sleepingbag-value":
				return "winter-sleepingbag-value";
			case "winter-sleepingbag-value":
				return "summer-sleepingbag-value";
			default:
				return null;
			// Return null if the item doesn't have an "or" group
		}
	}

	function deselectOtherItemInGroup(itemId) {
		// Function to deselect the other item in the same "or" group
		const otherItem = selectionItems.find((item) => item.id === itemId);
		// Find the other item based on its ID
		if (otherItem) {
			// If the other item is found
			otherItem.added = false;
			// Set the added property of the other item to false
			const otherItemElement = document.getElementById(itemId);
			// Get the HTML element of the other item
			if (otherItemElement) {
				otherItemElement.style.backgroundColor = "";
				// Remove the background color to indicate deselection
			}
		}
	}

	function deselectOtherItemInGroup(itemId) {
		const otherItem = selectionItems.find((item) => item.id === itemId);
		if (otherItem) {
			otherItem.added = false;
			const otherItemElement = document.getElementById(itemId);
			if (otherItemElement) {
				otherItemElement.style.backgroundColor = "";
			}
		}
	}

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
}

createFormula();
