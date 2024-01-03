/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = (data) => {
    const difference = Date.now() - data.created_at;
    const days = Math.floor(difference / 1000 / 86400);
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
        <div>${days} days ago</div>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  }

  const renderTweets = (tweets) => {
    tweets.forEach(element => {
      $('#tweets-container').append(createTweetElement(element));
    });
  }

  renderTweets(data);
});