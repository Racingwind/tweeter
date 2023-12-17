$(document).ready(function() {
  console.log("js is ready")

  $("#tweet-text").on('input', function() {
    const charLeft = 140 - $(this).val().length;
    const counter = $(this).parents('form').find('output');
    counter.text(charLeft);
    if (charLeft < 0) {
      $(counter).addClass('negative'); // Add the 'negative' class to turn text red
    } else {
      $(counter).removeClass('negative'); // Remove the 'negative' class
    }
  });
});

