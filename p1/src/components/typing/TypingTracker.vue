<template>
  <div class="typing-container">
    <div class="controls">
      <div v-if="state == ts.INACTIVE">
        <button @click="tsession.start" id="go">
          Go
          <p>
            <span>(Ctrl-Enter)</span>
          </p>
        </button>
      </div>
      <div v-else-if="Boolean(state & ts.ACTIVE)">
        <button @click="tsession.pause" id="pause">
          {{ state & ts.PAUSED ? "Unpause" : "Pause" }}
          <p>
            <span>(Ctrl-Enter)</span>
          </p>
        </button>

        <button @click="tsession.reset" id="reset">Reset</button>
      </div>
      <div v-else-if="Boolean(state & ts.FINISHED)">
        <button @click="tsession.reset" id="reset">Reset</button>
      </div>
    </div>

    <TimerDisplay :seconds="seconds" :state="state" />
    <slot />

    <div v-if="Boolean(state & ts.FINISHED)">
      <ResultSection :stats="tsession.getStats()" />
    </div>
  </div>
</template>

<script>
import ResultSection from "../ResultSection";
import TypingSession, { ts } from "./typing_session";
import TimerDisplay from "../TimerDisplay";
import { onMounted, onUnmounted, reactive, ref, toRefs } from "vue";

export default {
  name: "TypingTracker",
  props: {
    codeId: String,
  },
  components: {
    TimerDisplay,
    ResultSection,
  },

  setup(props) {
    const state = ref(ts.INACTIVE);
    const setState = (newState) => {
      return (state.value = newState);
    };
    const tsession = reactive(new TypingSession(props.codeId, state, setState));
    window.ts = tsession;

    const handleBinding = (event) => {
      if (event.ctrlKey && event.key === "Enter") {
        if (state.value == ts.INACTIVE) {
          tsession.start();
        } else if (state.value & ts.ACTIVE) {
          tsession.pause();
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleBinding);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleBinding);
    });

    let { seconds } = toRefs(tsession);
    return {
      ts,
      tsession,
      state,
      seconds,
    };
  },
};
</script>

<style lang="scss" scoped>
.controls {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: relative;
}

button {
  height: 70px;
  background-color: var(--np-active-background);
  color: var(--np-active);
  font-size: 24px;
  font-weight: 700;
  border-radius: 10px;
  /* padding-top: 5px; */
  cursor: pointer;
}

#pause {
  margin-right: 10px;
}

#go,
#pause {
  float: left;
  p {
    margin: 0;
    padding: 0;
    /* padding-bottom: 10px; */
  }

  span {
    font-size: 14px;
    color: #efe;
  }
}
</style>
