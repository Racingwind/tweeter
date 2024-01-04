/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // function to create a tweet article element
  const createTweetElement = (data) => {
    const timeSinceTweeted = timeago.format(data.created_at);
    return `<article class="tweet">
      <header>
        <div>
        <img src="${data.user.avatars}">
          ${data.user.name}
        </div>
        <div class="handle">${data.user.handle}</div>
      </header>
      <div class="content">${data.content.text}</div>
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


  // function to take an array of tweets and create a list of tweets and add it to the current web page
  const renderTweets = (tweets) => {
    tweets.forEach(element => {
      $('#tweets-container').append(createTweetElement(element));
    });
  };

  // renderTweets(data);


  // Listen for form submit and prevent default actions
  $('form').submit(function(event) {
    event.preventDefault();
    const tweetContent = $(this.text).val();
    if (!tweetContent) {
      alert('Error: Tweet content is empty!');
    }
    else if (tweetContent.length > 140) {
      alert('Error: Tweet exceeds maximum length');
    } else {
      const $formData = $(this).serialize();
      $.ajax('/tweets', { 
        method: 'POST',
        data: $formData
      });
      $(this.text).val('');
    }
  });


  // function to load tweets from server
  const loadTweets = () => {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();
});