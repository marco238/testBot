const restify = require('restify');
const builder = require('botbuilder');
const axios = require('axios');
require('dotenv').config();

// Setup Restify Server................. Useless when ussing Express
var server = restify.createServer();
server.listen(process.env.PORT || 3000, () => {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
// appId && appPassword will be stored in .env
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

//**************************************************************//
//********************* Response Methods ************************//
//**************************************************************//
let toGreet = () => 'Hi';
let getBotName = () => 'My name is Wall-C';
let getAdmin = () => 'The Admin`s name is Juan Cuesta';
let sayYes = () => 'Yeeeeeh';
let sayNo = () => ':(';
let createNews = () => 'Create News Link';
let makePayment = () => 'Make Payment Link';
let toNag = () => 'Please moderate you language';
let hobbies = () => 'I love going to Ironbeers';
let nextMeeting = () => 'The next meeting is .....';
let botTech = () => 'I was made with LUIS';
let botBirthday = () => 'I was born on April 27 at 4 am';
let botGender = () => 'I dont have a gender. Come on!!! Im a robot';
let communityData = () => 'All the community data';
let botStatus = () => 'Im ok! Thanks!';
//**************************************************************//
//***************************** :) *****************************//
//**************************************************************//

// Receive messages from the user and respond
var bot = new builder.UniversalBot(connector, session => {

    let string = session.message.text.toLowerCase();
    // Request to the URL
    axios.get(`${process.env.AZURE_BOT_URL}${string}`)
      .then(response => {
        console.log(response.data.topScoringIntent.intent);
        switch (response.data.topScoringIntent.intent) {
            case 'toGreet': session.send(toGreet());
                            break;
            case 'getBotName': session.send(getBotName());
                            break;
            case 'getAdmin': session.send(getAdmin());
                            break;
            case 'sayYes': session.send(sayYes());
                            break;
            case 'sayNo': session.send(sayNo());
                            break;
            case 'createNews': session.send(createNews());
                            break;
            case 'makePayment': session.send(makePayment());
                            break;
            case 'toNag': session.send(toNag());
                            break;
            case 'hobbies': session.send(hobbies());
                            break;
            case 'nextMeeting': session.send(nextMeeting());
                            break;
            case 'botTech': session.send(botTech());
                            break;
            case 'botBirthday': session.send(botBirthday());
                            break;
            case 'botGender': session.send(botGender());
                            break;
            case 'communityData': session.send(communityData());
                            break;
            case 'botStatus': session.send(botStatus());
                            break;
            default: session.send('Sorry, I dont get what you mean');

        }
      })
      .catch(error => {
        console.log(error);
      });
});
