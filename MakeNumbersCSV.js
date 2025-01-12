/**
 * CSV Numbering Tool for Printing Items - Generates a CSV file with numbers.
 * @param {number} ItemsQuantity - Total number of tickets to generate.
 * @param {number} ItemsPerSheet - Number of tickets/items on a printed sheet.
 * @param {number} StartNumber - Starting number for ticket/item numbering.
 * @param {number} ItemsPerBlocks - Number of tickets/items per block.
 * @param {boolean} UsePlaceHolders - If true, add column headers as placeholders.
 * @param {boolean} UseLeadingZeros - If true, pad ticket numbers with leading zeros.
 */
function MakeNumbersCSV(ItemsQuantity, ItemsPerSheet, StartNumber, ItemsPerBlocks, UsePlaceHolders = false, UseLeadingZeros = false) {
	// Filter Inputs parameters	
	// Convert-Force the variables to numbers
	ItemsQuantity = Number(ItemsQuantity);
	ItemsPerSheet = Number(ItemsPerSheet);
	StartNumber = Number(StartNumber);
	ItemsPerBlocks = Number(ItemsPerBlocks);
	
	// The Number() function returns NaN (Not a Number) if the value cannot be
	// converted to a valid number. I use isNaN() to check if the conversion was successful.
	if (isNaN(ItemsQuantity) || isNaN(ItemsPerSheet) || isNaN(StartNumber) || isNaN(ItemsPerBlocks)) {
		alert("Error: All inputs must be valid numbers.");
		return; // Exits the function if any of the values is invalid
	}
  
	if (!Number.isInteger(ItemsQuantity) || ItemsQuantity < 1 || ItemsQuantity > 100000) {
		alert("Error: 'Items Quantity' must be an integer between 1 and 100000.");
		return;
	}
	if (!Number.isInteger(ItemsPerSheet) || ItemsPerSheet < 1 || ItemsPerSheet > 100) {
		alert("Error: 'Items Per Sheet' must be an integer between 1 and 100.");
		return;
	}
	if (!Number.isInteger(StartNumber) || StartNumber < 1 || StartNumber > 100000) {
		alert("Error: 'Start Number' must be an integer between 1 and 100000.");
		return;
	}
	if (!Number.isInteger(ItemsPerBlocks) || ItemsPerBlocks < 1 || ItemsPerBlocks > 10000) {
		alert("Error: 'Items Per Block' must be an integer between 1 and 10000.");
		return;
	}
	if (typeof UsePlaceHolders !== "boolean") {
		alert("Error: 'Use placeholders' must be a boolean value (true or false).");
		return;
	}
	if (typeof UseLeadingZeros !== "boolean") {
		alert("Error: 'Use leading zeros' must be a boolean value (true or false).");
		return;
	}

	let csvContent = "data:text/csv;charset=utf-8,";

	// Calculate the total number of sheets required
	const SheetsToPrint = Math.ceil(Math.ceil(ItemsQuantity / ItemsPerSheet) / ItemsPerBlocks) * ItemsPerBlocks;

	// Calculate the actual number of tickets
	const FinalQuantity = SheetsToPrint * ItemsPerSheet;
	const EndNumber = StartNumber + FinalQuantity - 1;

	// Determine the padding for leading zeros
	const maxDigits = String(EndNumber).length;

	// Confirm with the user the tickets/items final quantity
	let Message = "";  // Initialize Message as an empty string
	if (FinalQuantity !== ItemsQuantity) {
		Message += "\r\nThe tickets/items quantity has been adjusted to " + FinalQuantity;
	}
	Message += "\r\nEnd number: " + EndNumber;
	Message += "\r\nSheets to print: " + SheetsToPrint;
	// Add the number of blocks if ItemsPerBlocks > 1
    if (ItemsPerBlocks > 1) {
        let Blocks = SheetsToPrint / ItemsPerBlocks;
        Message += " \r\nNumber of blocks: " + Math.ceil(Blocks); // Using Math.ceil to round up
    }

	const confirmUpdate = window.confirm(Message);
	if (!confirmUpdate) return;

	// Add CSV column header row if placeholders are enabled
	if (UsePlaceHolders) {
		const headers = Array.from({ length: ItemsPerSheet }, (_, i) => "N" + (i + 1));
		csvContent += headers.join(",") + "\r\n";
	}

	// Generate rows for each sheet
	for (let sheet = 0; sheet < SheetsToPrint; sheet++) {
		const row = [];
		for (let numeratorIndex = 0; numeratorIndex < ItemsPerSheet; numeratorIndex++) {
			 let ticketNumber = StartNumber + sheet + SheetsToPrint * numeratorIndex;

			// Apply leading zeros if enabled
			if (UseLeadingZeros) {
				ticketNumber = String(ticketNumber).padStart(maxDigits, "0");
			}

			row.push(ticketNumber);
		}
		csvContent += row.join(",") + "\r\n";
	}

	// Create and trigger download of the CSV file
	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	const fileName = prompt("Enter a name for the CSV file:", "numbered-items.csv");

	// Check if the user pressed "Cancel" in the filename prompt
	if (fileName !== null) {
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		console.log("File download canceled.");
	}
}
