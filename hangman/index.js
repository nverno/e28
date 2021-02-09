var fetch;
if (typeof window !== 'undefined') fetch = window.fetch;
else fetch = require('node-fetch');

const getQuotes = async () => {
  return fetch("https://type.fit/api/quotes")
    .then((resp) => resp)
    .then(data => data.json());
};

// Create collection of shown/hidden characters to display
const displayQuote = ({ text }, guessed) => {
  let finished = true;
  let div = document.getElementById('quote-container');
  div.innerHTML = '';

  for (const l of text.split('')) {
    let letter;
    const isAlpha = l.match(/[a-zA-Z]/);

    if (isAlpha && !(l in guessed)) {
      finished = false;
      letter = '_';
    } else {
      letter = l;
    }

    const letterEle = document.createElement('div');
    letterEle.innerText = letter;
    letterEle.className = l === ' ' ? 'space' : 'letter';
    div.appendChild(letterEle);
  }

  return finished;
};

const winner = () => {
  document.getElementByClassName('message')[0].innerText = 'Winner!!';
};

const displayAuthor = ({ author }) => {
  document.getElementsByClassName('author')[0]
    .appendChild(document.createTextNode('- ' + author));
};

document.addEventListener('DOMContentLoaded', async () => {
  let guessed = {};
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  window.quote = quote;

  window.submitGuess = () => {
    let guess = document.getElementById('guess').value;
    const quoteContainer = document.getElementById('quote-container');

    guessed[guess] = true;
    if (quoteContainer.appendChild(displayQuote(quote, guessed))) {
      winner();
    };

    guess.value = '';
    return false;
  };

  displayAuthor(quote);
  displayQuote(quote, {});
  
  console.log(quotes);
});
