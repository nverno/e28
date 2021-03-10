<template>
  <div class="feedback" :class="feedbackClass">
    <div v-if="correct" class="correct">
      You get it! Nice work.
      <button @click="restart">Play Again</button>
    </div>
    <div v-else-if="guessed" class="incorrect">
      Sorry, that's incorrect. Guess Again
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  props: {
    guessed: Boolean,
    incorrect: Boolean,
    restart: Function,
  },
  methods: {
    feedbackClass() {
      return this.guessed && this.correct ? 'correct' : 'incorrect';
    }
  }
}
</script>

<style lang="scss">
.feedback {
  color: #fff;
  margin-top: 10px;
  div {
    text-align: center;
    border-radius: 10px;
  }
  .correct {
    background-color: forestgreen;
  }

  .incorrect {
    background-color: darkred;
  }
}
</style>
