const fs = require('fs');

fs.readFile('myMessages.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const messages = data.split('\n');

	const goodNightMessages = [];
	const goodMorningMessages = [];

	messages.forEach((message) => {
		const time = message.split(' ')[1];
		const hours = parseInt(time.substring(0, 2));
		message = message.toLowerCase();

		if (
			(message.includes('gn') ||
				message.includes('good night') ||
				message.includes('g n') ||
				message.includes('media omitted') && (hours >= 21 || hours <= 3))
		) {
			goodNightMessages.push(`${message.split(' ')[0]} ${time}`);
		} else if (
			(message.includes('gm') ||
				message.includes('g m') ||
				message.includes('media omitted') && (hours >= 4 && hours <= 10))) {
			goodMorningMessages.push(`${message.split(' ')[0]} ${time}`);
		}
	});

	fs.writeFile(
		'goodNight.txt',
		goodNightMessages.join('\n'),
		'utf8',
		(err) => {
			if (err) {
				console.error('Error writing goodNight.txt:', err);
			} else {
				console.log('Messages for good night saved in goodNight.txt');
			}
		}
	);

	fs.writeFile(
		'goodMorning.txt',
		goodMorningMessages.join('\n'),
		'utf8',
		(err) => {
			if (err) {
				console.error('Error writing goodMorning.txt:', err);
			} else {
				console.log(
					'Messages for good morning saved in goodMorning.txt'
				);
			}
		}
	);
});
