"use strict";
window.addEventListener("load", function(event) {
    var loginField = document.getElementById("login");
    var passwordField = document.getElementById("password");
    var saveButton = document.getElementById("save");

    browser.storage.local.get({login: null, password: null}).then(
        result => { loginField.value = result.login; passwordField.value = result.password }, 
        console.error
    );

    saveButton.addEventListener("click", function(event) {
        browser.storage.local.set({login: loginField.value, password: passwordField.value})
            .then(() => {}, console.error);
    });
});
