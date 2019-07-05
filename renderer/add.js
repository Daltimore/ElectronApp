'use strict'

const { ipcRenderer } = require('electron')
const notifier = require('node-notifier')
const $ = require('jquery')

$(document).ready(function() {

  $("#my-btn").attr("disabled", true);

document.getElementById('todoForm').addEventListener('submit', (evt) => {
  // prevent default refresh functionality of forms
  evt.preventDefault()

  // input on the form
  const input = evt.target[0]


  // send todo to main process
  

  if(input.value == '') {
    document.getElementById('error').innerHTML = "This is required!!!"
  } else {
    $("#my-btn").attr("disabled", false);
    ipcRenderer.send('add-todo', input.value)
    document.getElementById('my-btn').onclick = () => {
      notifier.notify ({
         title: 'Success',
         message: 'Todo Added'
      
      }, function (err, response) {
         // Response is response from notification
      });

      notifier.on('click', function (notifierObject, options) {
         console.log("You clicked on the notification")
      });

      notifier.on('timeout', function (notifierObject, options) {
         console.log("Notification timed out!")
      });
   }
   
  }
  

  // reset input
  input.value = ''
})

})
