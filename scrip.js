const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: 'https://raw.githubusercontent.com/bradtraversy/vanillawebprojects/76c37b83c3a9366c6f971aadfde70a6e64aef125/speech-text-reader/img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();