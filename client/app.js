'use strict';

const references = {
    loginForm: document.getElementById('welcome-form'),
    messagesSection: document.getElementById('messages-section'),
    messagesList: document.getElementById('messages-list'),
    addMessageForm: document.getElementById('add-messages-form'),
    userNameInput: document.getElementById('username'),
    messageContentInput: document.getElementById('message-content'),
};

let userName;

const login = function(event) {
    event.preventDefault();
    if(references.userNameInput.value) {
        userName = references.userNameInput.value;
        references.messagesSection.classList.add('show');
        references.loginForm.classList.remover('show');
    } else window.alert('Please write your login.');
};

references.loginForm.addEventListener('submit', login);