var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#emailInput");
var phoneNumber = document.querySelector("#telephone");
var contact = document.querySelector("#contact-method");
var member = document.querySelector("#member");
var subject = document.querySelector("#subject");
var comments = document.querySelector("#comments");
var messageButton = document.querySelector("#messageButton");

messageButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  var visitor = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneNumber.value.trim(),
    member: member.value,
    subjectLine: subject.value.trim(),
    comment: comments.value.trim(),
  };

  localStorage.setItem("visitor", JSON.stringify(visitor));

});