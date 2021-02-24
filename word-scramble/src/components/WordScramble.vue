<template>
  <div>
    <h1>Word Scramble</h1>
    <form @submit.prevent="play">
      <label>Enter your player name:
        <input v-model="player" required>
        <button type="submit">Let's Play!</button>
      </label>
    </form>
    <transition name="fade">
      <div v-if="gameOn" class="game">
        <span>Game on, {{ player }}!</span>
        <GuessWord />
      </div>
    </transition>
  </div>
</template>

<script>
import GuessWord from './GuessWord';
export default {
  name: 'WordScramble',
  components: {
    GuessWord,
  },
  data() {
    return {
      player: null,
      gameOn: false,
    }
  },
  methods: {
    play() {
      this.gameOn = this.player;
    }
  }
}
</script>

<style>
.game {
  margin-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
