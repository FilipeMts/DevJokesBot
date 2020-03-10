const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const axios = require('axios');

client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return
  }
  if (receivedMessage.content.startsWith('!')) {
    processCommand(receivedMessage)
  }
});

const processCommand = receivedMessage => {
  let fullCommand = receivedMessage.content.substr(1);    
  let splitCommand = fullCommand.split(' ');  
  let primaryCommand = splitCommand[0];
  if (primaryCommand == 'joke') {
    jokeCommand(receivedMessage)        
  }
  else {
    receivedMessage.channel.send(`I don't understand that command. Try !joke`)
  }
};

const url = 'https://official-joke-api.appspot.com/jokes/programming/random';
const jokeCommand = async receivedMessage => {
  try {
      const response = await axios.get(url);
      return response.data.map(joke => {
          receivedMessage.channel.send(`${joke.setup}` + `${joke.punchline}`)  
      })
  }
  catch(error) {
      console.log('error getting the joke');
      throw(error);
  };
};

client.login(process.env.DISC_TOKEN);
