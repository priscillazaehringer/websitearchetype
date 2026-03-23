/* ============================================
   SITE IN 8 - BRAND QUIZ
   Quiz Logic & Scoring
   ============================================ */

const QUIZ_STORAGE_KEY = 'sitein8_quiz';

const QUESTIONS = [
  {
    q: "You started something a year ago and never finished it. What is the most honest reason why?",
    hint: "Be honest, not aspirational.",
    options: [
      { t: "I got what I needed from starting it. The finish line was never the point.", s: { explorer: 3, creator: 2 } },
      { t: "Something more urgent took over and I never found my way back.", s: { caregiver: 2, everyperson: 2, hero: 1 } },
      { t: "I realized it wasn't mine to build. It belonged to a different version of me.", s: { magician: 3, sage: 1 } },
      { t: "It's not abandoned. It's just waiting.", s: { creator: 3, magician: 1 } }
    ]
  },
  {
    q: "You walk into a room and immediately change the energy. What actually happened?",
    hint: "Not what you did. What people felt.",
    options: [
      { t: "People felt like they could relax.", s: { caregiver: 3, innocent: 1, everyperson: 1 } },
      { t: "People felt like something interesting was about to happen.", s: { magician: 3, jester: 1 } },
      { t: "People felt like someone finally knew what they were doing.", s: { ruler: 3, sage: 1, hero: 1 } },
      { t: "People felt like the rules were suddenly optional.", s: { rebel: 3, explorer: 1 } }
    ]
  },
  {
    q: "Someone needs to hear something difficult. You are the one who has to say it. How do you approach it?",
    hint: "Your actual instinct, not the ideal version.",
    options: [
      { t: "I find the gentlest true version of it.", s: { caregiver: 3, lover: 1 } },
      { t: "I say it plainly and let them sit with it.", s: { sage: 3, ruler: 1 } },
      { t: "I frame it around what becomes possible once they hear it.", s: { magician: 3, hero: 1 } },
      { t: "I ask a question that makes them say it themselves.", s: { sage: 2, magician: 2, creator: 1 } }
    ]
  },
  {
    q: "A week with nothing scheduled. No obligations, no guilt. By day three, what are you actually doing?",
    hint: "No shoulds allowed.",
    options: [
      { t: "Building or making something I've had in my head for months.", s: { creator: 3, magician: 1 } },
      { t: "Being deeply present with the people I love most.", s: { caregiver: 3, lover: 2 } },
      { t: "Researching something that has nothing to do with my work. Yet.", s: { sage: 3, explorer: 1 } },
      { t: "Moving. Somewhere new. I don't plan, I just go.", s: { explorer: 3, rebel: 2 } }
    ]
  },
  {
    q: "Your biggest professional failure. What is the version of that story you actually believe?",
    hint: "Not the lesson you tell people. The one you actually hold.",
    options: [
      { t: "It taught me something nothing else could have.", s: { sage: 3, hero: 1 } },
      { t: "It happened because I cared too much about the wrong thing.", s: { caregiver: 2, lover: 2, magician: 1 } },
      { t: "It was the necessary cost of trying something real.", s: { rebel: 3, explorer: 1, hero: 1 } },
      { t: "It still stings. And that's fine. It should.", s: { creator: 2, hero: 2, everyperson: 1 } }
    ]
  },
  {
    q: "A client gets incredible results but gives all the credit to themselves. You feel:",
    hint: "Your first reaction, before you manage it.",
    options: [
      { t: "Genuinely happy. Their win is the whole point.", s: { caregiver: 3, innocent: 1 } },
      { t: "Quietly satisfied. I know what I contributed.", s: { ruler: 2, sage: 2, magician: 1 } },
      { t: "Curious about what made this one land so well.", s: { sage: 3, creator: 1 } },
      { t: "A little annoyed, honestly. Then I let it go.", s: { hero: 2, rebel: 2, everyperson: 1 } }
    ]
  },
  {
    q: "One of these is sitting on your desk. Which one?",
    hint: "The one that already feels true.",
    options: [
      { t: "A single plant you've kept alive for years.", s: { caregiver: 3, innocent: 2 } },
      { t: "A notebook with the spine broken from use.", s: { creator: 3, sage: 1 } },
      { t: "Something that doesn't belong there but you keep anyway.", s: { magician: 2, rebel: 2, lover: 1 } },
      { t: "Nothing. A clear surface is a clear mind.", s: { ruler: 3, sage: 1 } }
    ]
  },
  {
    q: "Someone pushes past a limit you have set. What actually happens inside you?",
    hint: "Before you respond. The internal thing.",
    options: [
      { t: "Disappointment. I expected better from them.", s: { caregiver: 2, innocent: 2, lover: 1 } },
      { t: "Resolve. It just got clearer, not harder.", s: { hero: 3, ruler: 2 } },
      { t: "Curiosity. What made them think that was okay?", s: { sage: 3, magician: 1 } },
      { t: "A very quiet, very final decision.", s: { rebel: 3, ruler: 1 } }
    ]
  },
  {
    q: "You are in the middle of the best work of your life. What does it feel like?",
    hint: "Not what it produces. What it feels like from inside.",
    options: [
      { t: "Like I am translating something that already exists somewhere.", s: { magician: 3, creator: 1 } },
      { t: "Like I am solving a puzzle that keeps revealing new layers.", s: { sage: 3, creator: 2 } },
      { t: "Like I am building something that will outlast me.", s: { ruler: 3, hero: 2 } },
      { t: "Like I finally stopped pretending and just went.", s: { rebel: 3, explorer: 2 } }
    ]
  },
  {
    q: "Someone says something about you that stops you cold, in the best way. What did they say?",
    hint: "The one that would actually land.",
    options: [
      { t: '"You made me feel like I could actually do this."', s: { caregiver: 3, magician: 1, hero: 1 } },
      { t: '"I don\'t know how you saw that coming."', s: { magician: 3, sage: 2 } },
      { t: '"You changed how I think about this."', s: { sage: 3, magician: 1, creator: 1 } },
      { t: '"I\'ve never met anyone who just goes for it like that."', s: { rebel: 3, explorer: 2 } }
    ]
  },
  {
    q: "Pick one.",
    hint: "The one that pulls at something.",
    options: [
      { t: "Candlelight. Warm, intimate, slightly dangerous.", s: { magician: 2, lover: 3 } },
      { t: "Morning light. Clear, honest, full of possibility.", s: { innocent: 3, hero: 1, sage: 1 } },
      { t: "Golden hour. Fleeting, beautiful, worth stopping for.", s: { lover: 2, creator: 2, explorer: 1 } },
      { t: "Overcast. Even, diffuse, everything visible.", s: { sage: 2, ruler: 2, everyperson: 1 } }
    ]
  },
  {
    q: "You are at a fork. Both paths are good. How do you choose?",
    hint: "Your actual method, not the wise version.",
    options: [
      { t: "I follow the one that scares me slightly more.", s: { hero: 3, rebel: 2, explorer: 1 } },
      { t: "I choose the one that serves the most people.", s: { caregiver: 3, ruler: 1 } },
      { t: "I choose the one I can commit to completely.", s: { ruler: 3, hero: 1, lover: 1 } },
      { t: "I sit with it until one of them stops feeling like a choice.", s: { magician: 3, sage: 2 } }
    ]
  },
  {
    q: "Not what you will be remembered for. What do you want to have been true?",
    hint: "The one that lands deepest.",
    options: [
      { t: "That I made people feel less alone.", s: { caregiver: 3, lover: 2, everyperson: 1 } },
      { t: "That I built something that kept working after I stopped.", s: { ruler: 3, hero: 2, creator: 1 } },
      { t: "That I told the truth when it would have been easier not to.", s: { sage: 3, rebel: 2, innocent: 1 } },
      { t: "That I lived like the rules were suggestions and the world got bigger for it.", s: { rebel: 3, explorer: 2, magician: 1 } }
    ]
  },
  {
    q: "You are describing your work to someone who has never heard of you. Which sounds most like you?",
    hint: "The one that pulls at something.",
    options: [
      { t: '"I help people become who they were already trying to be."', s: { magician: 3, caregiver: 2 } },
      { t: '"I build things that work the way they are supposed to."', s: { ruler: 3, hero: 2, sage: 1 } },
      { t: '"I make the complicated feel possible."', s: { sage: 3, creator: 2, innocent: 1 } },
      { t: '"I do what other people decided was not allowed."', s: { rebel: 3, explorer: 2 } }
    ]
  },
  {
    q: "The last one. Go with your gut.",
    hint: "Which pulls at something?",
    options: [
      { t: "Raw concrete. Imperfect, permanent, honest.", s: { hero: 3, ruler: 2, everyperson: 1 } },
      { t: "Old leather. Worn in, earned, irreplaceable.", s: { explorer: 3, rebel: 2, sage: 1 } },
      { t: "Still water. Calm on top, everything happening underneath.", s: { magician: 3, lover: 2, sage: 1 } },
      { t: "Uncut fabric. Pure potential, hasn't become anything yet.", s: { creator: 3, innocent: 2, magician: 1 } }
    ]
  }
];

// Score answers and return top archetype
function calculateResult(answers) {
  const scores = {};
  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    const opt = QUESTIONS[questionIndex].options[answerIndex];
    Object.entries(opt.s).forEach(([k, v]) => {
      scores[k] = (scores[k] || 0) + v;
    });
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return {
    primary: sorted[0]?.[0] || 'magician',
    secondary: sorted[1]?.[0] || null,
    scores
  };
}

// Save state to localStorage
function saveProgress(answers, email) {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({
      answers,
      email: email || null,
      savedAt: new Date().toISOString()
    }));
  } catch(e) {
    console.warn('Could not save progress:', e);
  }
}

// Load state from localStorage
function loadProgress() {
  try {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch(e) {
    return null;
  }
}

// Clear saved state
function clearProgress() {
  try {
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch(e) {}
}

// Get result page URL for an archetype
function getResultURL(archetype) {
  return `${archetype}.html`;
}

// Export for use in HTML files
if (typeof module !== 'undefined') {
  module.exports = { QUESTIONS, calculateResult, saveProgress, loadProgress, clearProgress, getResultURL };
}
