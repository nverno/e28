// typing states
export const ts = {
  INACTIVE: 0, // no timer, no session
  ACTIVE: 1, // timer exists, may/may not be running
  PAUSED: 2, // timer paused
  FINISHED: 4, // session complete
};

export default class TypingSession {
  constructor(elementId, state, setState) {
    this.elementId = elementId;
    this.nodes = [];
    this.activeIndex = 0;
    this.typeable = null;
    this.stats = {
      incorrect: 0,
      collateral: 0,
      backspaces: 0,
      misses: {},
    };
    this.backtrack = false;
    this.seconds = 0;
    this.timer = null;
    this.state = state;
    this.setState = setState;
    this.handleInput = this.handleInput.bind(this);
  }

  reset() {
    this.stop();
    this.setBacktrack(false);
    this.setFinished(false);
    this.setPaused(false);
    this.nodes.forEach(node => {
      node.classList.remove(
        'active',
        'incorrect',
        'collateral',
        'wasincorrect',
        'wascollateral',
      );
      node.classList.add('pending');
    });
    this.stats = {
      incorrect: 0,
      collateral: 0,
      backspaces: 0,
      misses: {},
    };
    this.activeIndex = 0;
    this.seconds = 0;
    this.state = this.setState(ts.INACTIVE);
  }

  countTypeable() {
    return this.nodes.reduce(
      (acc, n) => acc + Number(!n.classList.contains('skip')),
      0,
    );
  }

  // Manage classes of letter nodes
  addClass(cls) {
    let clist = this.nodes[this.activeIndex].classList;
    if (!clist.contains(cls)) clist.add(cls);
  }

  removeClass(cls) {
    this.nodes[this.activeIndex].classList.remove(cls);
  }

  updateClasses({ add, remove }) {
    if (remove)
      for (const cls of remove) {
        this.removeClass(cls);
      }
    if (add)
      for (const cls of add) {
        this.addClass(cls);
      }
  }

  activeChar() {
    return this.nodes[this.activeIndex].innerText;
  }

  contains(cls) {
    return this.nodes[this.activeIndex].classList.contains(cls);
  }

  // Toggle b/w 'backtrack' state - this is turned on after typing errors
  setBacktrack(on) {
    this.backtrack = on;
    let ele = document.getElementById(this.elementId);
    ele.classList.remove('backtrack');
    if (on) ele.classList.add('backtrack');
  }

  setPaused(on) {
    let ele = document.getElementById(this.elementId);
    ele.classList.remove('paused');
    if (on) ele.classList.add('paused');
  }

  // mark the letter node at point as active, removing previous states
  markActive() {
    this.updateClasses({
      add: ['active'],
      remove: ['pending', 'incorrect', 'collateral'],
    });
  }

  // called prior to incrementing cursor after incorrect input
  // marks cursor node as either incorrect or collateral
  // if this is the first incorrect input in sequence, toggles backtrack state
  markIncorrect() {
    if (this.backtrack) {
      this.updateClasses({ add: ['collateral', 'wascollateral'] });
      ++this.stats.collateral;
    } else {
      const c = this.activeChar();
      this.updateClasses({ add: ['incorrect', 'wasincorrect'] });
      ++this.stats.incorrect;
      if (this.stats.misses[c]) ++this.stats.misses[c];
      else this.stats.misses[c] = 1;
      this.setBacktrack(true);
    }
  }

  startTimer() {
    this.state = this.setState(ts.ACTIVE);
    this.timer = setInterval(() => {
      ++this.seconds;
    }, 1000);
  }

  stopTimer() {
    this.state = this.setState(this.state | ts.PAUSED);
    clearInterval(this.timer);
  }

  start() {
    this.nodes = Array.from(document.getElementById(this.elementId).childNodes);
    this.typeable = this.typeable || this.countTypeable();
    this.reset();
    this.startTimer();
    this.markActive();
    window.addEventListener('keydown', this.handleInput);
  }

  stop() {
    window.removeEventListener('keydown', this.handleInput);
    this.stopTimer();
  }

  pause() {
    if (this.state & ts.PAUSED) {
      this.startTimer();
      this.setPaused(false);
    } else {
      this.stopTimer();
      this.setPaused(true);
    }
  }

  // session statistics
  getStats() {
    return {
      typeable: this.typeable,
      seconds: this.seconds,
      ...this.stats,
    };
  }

  isFinished() {
    return !this.backtrack && this.activeIndex === this.nodes.length - 1;
  }

  setFinished(finished) {
    let cl = document.getElementById(this.elementId).classList;
    cl.remove('finished');
    if (finished) {
      cl.add('finished');
      this.removeClass('active');
      this.state = this.setState(ts.FINISHED);
    }
  }

  // move the cursor
  step({ newline, backspace }) {
    this.removeClass('active');
    do {
      if (backspace) {
        // if cursor has moved back past start of error, switch backtrack
        if (this.backtrack && this.contains('incorrect'))
          this.setBacktrack(false);
        this.updateClasses({
          add: ['pending'],
          remove: ['collateral', 'incorrect'],
        });
        if (this.activeIndex > 0) --this.activeIndex;
      } else {
        if (this.activeIndex < this.nodes.length - 1) ++this.activeIndex;
        else break;
      }
    } while (
      this.contains('skip') ||
      (newline && this.nodes[this.activeIndex].innerText.match(/\s/))
    );

    if (this.backtrack && this.contains('incorrect')) {
      this.setBacktrack(false);
    }
    this.markActive();
  }

  // Main event handler to process typing input
  handleInput(event) {
    if (this.state.value & ts.PAUSED) return;
    if (event.ctrlKey || event.altKey || event.metaKey || event.key === 'Shift')
      return;
    event.preventDefault();
    console.log("DEBUG: this.state.value & ts.PAUSED: ", this.state.value & ts.PAUSED);
    const key = event.key;
    if (key === 'Backspace') {
      ++this.stats.backspaces;
      this.step({ backspace: true });
    } else {
      const target = this.nodes[this.activeIndex].innerText;
      const isNewline = key === 'Enter';
      if (
        !this.backtrack &&
        (key === target || (isNewline && target === '\n'))
      ) {
        if (this.isFinished()) {
          this.stop();
          this.setFinished(true);
          // console.log(this.getStats());
        } else this.step({ newline: isNewline });
      } else {
        this.markIncorrect();
        this.step({ newline: isNewline });
      }
    }
  }
}
