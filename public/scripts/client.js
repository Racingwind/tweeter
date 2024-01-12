/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  // function to create a tweet article element
  const createTweetElement = (data) => {
    const timeSinceTweeted = timeago.format(data.created_at);
    // escape the tweet text and make it "safe"
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(data.content.text));
    const safeText = div.innerHTML;
    return `<article class="tweet">
      <header>
        <div class="username">
        <img src="${data.user.avatars}">
          ${data.user.name}
        </div>
        <div class="handle">${data.user.handle}</div>
      </header>
      <div class="content">${safeText}</div>
      <footer>
        <div>${timeSinceTweeted}</div>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  };


  // function to take a data set of tweets and create a list of tweets and add it to the current web page
  const renderTweets = (tweets) => {
    if (Array.isArray(tweets)) {
      tweets.forEach(element => {
        $('#tweets-container').append(createTweetElement(element));
      });
    } else {
      $('#tweets-container').append(createTweetElement(tweets));
    }
  };


  // Listen for form submit and prevent default actions
  $('form').submit(function(event) {
    event.preventDefault();
    const tweetContent = $(this.text).val();
    const errorMsg = $('.error-message');
    if (!tweetContent) {
      errorMsg.text('Error: Tweet content is empty!').slideDown();
    }
    else if (tweetContent.length > 140) {
      errorMsg.text('Error: Tweet exceeds maximum length!').slideDown();
    } else {
      errorMsg.slideUp();
      const $formData = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: $formData })
      .then (function () {
        // clear tweet form text box, reset character counter and reload tweets after submission confirmation
        $(this.text).val(''); // clear tweet box
        $(this).find('output').text('140'); // traverse DOM tree to reset counter
        loadTweets('latest'); // pass it 'latest' to only render the latest tweet
      }.bind(this)); // need to pass the context of 'this' (the form)
    }
  });


  // function to load tweets from server
  const loadTweets = (type) => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      if (type === 'latest') {
        renderTweets(data[data.length - 1]);
      } else {
        renderTweets(data);
      }
    });
  };

  loadTweets();
});