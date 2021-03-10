<template>
  <section>
    <div>
      <p>Your mystery word is: <span class="scramble">{{ scrambled }}</span></p>
      <p>Hint: <i>{{ hint }}</i></p>

      <form @submit.prevent="tryGuess">
        <label>Your guess:
          <input v-model="guess">
        </label>
        <button type="submit">Submit guess</button>
      </form>

      <Feedback :guessed="guessed" :correct="correct" :restart="restart" />
    </div>
  </section>
</template>

<script>
import Feedback from './Feedback.vue';

export default {
  name: 'GuessWord',
  components: {
    Feedback,
  },
  props: {},
  data() {
    this.restart = this.restart.bind(this);

    return {
      guessed: false,
      guess: null,
      correct: false,
      word: null,
      hint: null,
      words: [
        ['rick', "Im pickle ****!!!"],
        ['apple', 'Sometimes red, sometimes delicious'],
        ['washington', 'Rushmore’s left edge'],
        ['pumpkin', 'Halloween’s favorite fruit'],
        ['football', 'Play with your hands or feet, depending on your location']
      ]      
    }
  },
  created() {
    this.chooseWord();
  },
  computed: {
    scrambled() {
      let len = this.word.length;
      let arr = this.word.split('');
      while (len) {
        const i = Math.floor(Math.random() * len--);
        [arr[len], arr[i]] = [arr[i], arr[len]];
      }
      return arr.join('');
    },
    /* feedbackClass() {
     *   return this.guessed && this.correct ? 'correct' : 'incorrect';
     * }, */
  },
  methods: {
    chooseWord() {
      /* don't choose same word twice in a row */
      let i;
      do {
        i = Math.floor(Math.random() * this.words.length);
      } while (this.words[i][0] === this.word);
      
      this.word = this.words[i][0];
      this.hint = this.words[i][1];
    },
    tryGuess() {
      this.correct = this.guess && this.guess.toLowerCase() === this.word;
      this.guessed = true;
    },
    restart() {
      this.guessed = false;
      this.guess = null;
      this.correct = false;
      this.chooseWord();
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    text-align: left;
  }
}
.scramble {
  font-size: 18px;
  font-weight: 700;
}
</style>
