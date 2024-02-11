const fs = require('fs');

fs.readFile('./my_sleep_schedule_data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const messages = data.split('\n');

  const myMessages = messages.filter((message) => message.includes('Divy Sisodia'));

  // const formattedMessages = myMessages.map((message) => {
  //   const date = message.split(',')[0].trim()
  //   const content = message.split(',')[1].split('-')[1].split(':')[1].trim()
  //   const time = message.split(',')[1].split('-')[0].trim()
  //   const hours = time.split(':')[0];
  //   if(parseInt(hours) <= 9 || parseInt(hours) >= 21)
  //     return `${date} ${time} ${content}`;
  // });

  // fs.writeFile('myMessages.txt', formattedMessages.join('\n'), 'utf8', (err) => {
  //   if (err) {
  //     console.error('Error writing file:', err);
  //     return;
  //   }

  //   console.log('Messages saved in myMessages.txt');
  // });

  const formattedMessages = myMessages.reduce((acc, message) => {
    const date = message.split(',')[0].trim();
    const content = message.split(',')[1].split('-')[1].split(':')[1].trim();
    const time = message.split(',')[1].split('-')[0].trim();
    const hours = parseInt(time.split(':')[0], 10);
  
    if (hours <= 9 || hours >= 21) {
      acc.push(`${date} ${time} ${content.toLowerCase()}`);
    }
  
    return acc;
  }, []);
  
  fs.writeFile('myMessages.txt', formattedMessages.join('\n'), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  
    console.log('Messages saved in myMessages.txt');
  });
});
