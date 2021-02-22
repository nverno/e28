<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <p>Practice typing code.  See your speed and discover problem keys and
    combinations.</p>
  <p class="subtitle">Based off <a href="https://typing.io">typing.io</a></p>
  <TypingTracker codeId="code">
    <CodeContainer />
  </TypingTracker>
</template>

<script>
import TypingTracker from './components/typing/TypingTracker.vue';
import CodeContainer from './components/code/CodeContainer.vue';
import './styles/theme.scss';

export default {
  name: 'App',
  components: {
    TypingTracker,
    CodeContainer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.subtitle {
  color: var(--np-collateral);
  font-style: italic;
  margin-top: -10px;
  padding-top: 0;
}
</style>
