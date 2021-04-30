'use strict';

// Variables
const loginForm = document.getElementById('welcome-form'),
    messagesSection = document.getElementById('messages-section'),
    messagesList = document.getElementById('messages-list'),
    addMessageForm = document.getElementById('add-messages-form'),
    userNameInput = document.getElementById('username'),
    messageContentInput = document.getElementById('message-content');
 
let userName; 

//Listeners
loginForm.addEventListener('submit', event => login(event));
addMessageForm.addEventListener('submit', event => sendMessage(event));

//Socket IO
const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

//Functions 

function login(event) {
    event.preventDefault();
    if(userNameInput.value) {
        userName = userNameInput.value;
        socket.emit('join', userName);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else {
        window.alert('Please write your username');
    }
};

function sendMessage(event) {
    event.preventDefault();
    if (messageContentInput.value) {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value });
        messageContentInput.value = '';
    } else {
        window.alert('You have to type your message')
    }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');
    if(author === userName) {
        message.classList.add('message--self');
    } else if (author === 'Chat Bot') {
        message.classList.add('message--bot');
    }
  

  // author element
  const authorElem = document.createElement('h3');
  authorElem.classList.add('message__author');
  authorElem.innerText = author === userName ? 'You' : author;
  message.appendChild(authorElem);

  // content element
  const contentElem = document.createElement('div');
  contentElem.classList.add('message__content');
  contentElem.innerText = content;
  message.appendChild(contentElem);

  messagesList.appendChild(message);
};