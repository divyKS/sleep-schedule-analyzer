const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Read the goodNight.txt file
fs.readFile('goodNight.txt', 'utf8', (err, nightData) => {
	if (err) {
		console.error('Error reading goodNight.txt:', err);
		return;
	}

	// Convert text data to arrays
	const nightMessages = nightData.split('\n');

	// Define CSV headers
	const csvHeaders = ['Date', 'Time'];

	// Create CSV writers for good night and good morning
	const nightCsvWriter = createCsvWriter({
		path: 'goodNight.csv',
		header: csvHeaders.map((header) => ({ id: header, title: header })),
	});

	// Prepare data for writing to CSV
	const nightCsvData = nightMessages.map((message) => {
		const [date, time] = message.split(' ');
		return { Date: date, Time: time };
	});

	// Write data to CSV files
	nightCsvWriter.writeRecords(nightCsvData).then(() => {
		console.log('Data for good night exported to goodNight.csv');
	});
});

fs.readFile('goodMorning.txt', 'utf8', (err, morningData) => {
	if (err) {
		console.error('Error reading goodMorning.txt:', err);
		return;
	}
	const csvHeaders = ['Date', 'Time'];

	const morningMessages = morningData.split('\n');

	const morningCsvWriter = createCsvWriter({
		path: 'goodMorning.csv',
		header: csvHeaders.map((header) => ({ id: header, title: header })),
	});
	const morningCsvData = morningMessages.map((message) => {
		const [date, time] = message.split(' ');
		return { Date: date, Time: time };
	});
	morningCsvWriter.writeRecords(morningCsvData).then(() => {
		console.log('Data for good morning exported to goodMorning.csv');
	});
});
