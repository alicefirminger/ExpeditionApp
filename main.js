console.log("hello, world");

// PLAN
// Write a function that onclick adds the total columns selected and inputs them in a 'totals' column.
// It should add up each 'section total' and then an overall weight total
// Then it should have this formula 12 - overall weight total

function createFormula() {
	const basicsTotal = document.getElementById("basics-total").textContent;

	const selectionsTotal =
		document.getElementById("selections-total").textContent;
	const lightTentValue = parseFloat(
		document.getElementById("light-tent-value").textContent
	);
	const mountainTentValue = parseFloat(
		document.getElementById("mountain-tent-value").textContent
	);
	const summerSleepingbagValue = parseFloat(
		document.getElementById("summer-sleepingbag-value").textContent
	);
	const winterSleepingbagValue = parseFloat(
		document.getElementById("winter-sleepingbag-value").textContent
	);

	const extrasTotal = document.getElementById("extras-total").textContent;
	const waterValue = parseFloat(
		document.getElementById("water-value").textContent
	);
	const extraFoodValue = parseFloat(
		document.getElementById("extra-food-value").textContent
	);
	const accessoriesValue = parseFloat(
		document.getElementById("accessories-value").textContent
	);

	let overallTotal = parseFloat(
		document.getElementById("overall-total").textContent
	);

	overallTotal = basicsTotal + selectionsTotal + extrasTotal;

	const moveSpeed = 12 - overallTotal;
	const moveSpeedElement = document.createElement("h1");
	const moveSpeedText = document.createTextNode(`${moveSpeed} + dice throw`);
	moveSpeedElement.appendChild(moveSpeedText);
	const moveSpeedTotal = document.getElementById("move-speed-total");
	moveSpeedTotal.appendChild(moveSpeedElement);

	console.log(selectionsTotal, "selectionsTotal");
	console.log(extrasTotal, "extrasTotal");
	console.log(overallTotal);
	console.log(moveSpeed);
}
createFormula();
