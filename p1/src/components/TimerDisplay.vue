<template>
  <div class="timer">
    <span :class="className">{{ $filters.minutes(seconds) }}</span>
  </div>
</template>

<script>
import { ts } from "./typing/typing_session";
export default {
  name: "TimerDisplay",
  props: {
    seconds: Number,
    state: Number,
  },
  computed: {
    className() {
      const paused = this.state & ts.PAUSED,
        active = !paused && this.state & ts.ACTIVE;
      return {
        "timer-paused": paused,
        "timer-active": active,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.timer {
  font-size: 24px;
}
.timer-paused {
  color: var(--np-paused-background);
}
.timer-active {
  color: var(--np-active-background);
}
</style>
