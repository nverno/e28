<template>
  <div class="results" ref="results">
    <h1>Results Summary</h1>

    <table class="results-table">
      <tbody>
        <tr>
          <td>typeable characters</td>
          <td>
            <span class="value">{{ stats.typeable }}</span>
          </td>
          <td class="derivation"></td>
        </tr>
        <tr>
          <td>typed characters</td>
          <td>
            <span class="value">{{ total }}</span>
          </td>
          <td class="derivation">
            <div class="contents">
              <table class="calculations">
                <tr>
                  <td></td>
                  <td class="charCount">{{ stats.typeable }}</td>
                  <td>typeable characters</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td class="incorrectCount">{{ stats.incorrect }}</td>
                  <td>incorrectly typed</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td class="collateralCount">{{ stats.collateral }}</td>
                  <td>collaterally typed before backspacing</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td class="backspaceCount">{{ stats.backspaces }}</td>
                  <td>backspaces</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <tr>
          <td>unproductive keystroke overhead</td>
          <td>
            <span class="value">{{ $filters.percent(overhead) }}</span>
          </td>
          <td class="derivation">
            <div class="computation">
              <span class="fraction">
                <div class="numerator">
                  {{ total }} typed characters -
                  {{ stats.typeable }} typeable characters
                </div>
                <div class="denominator">{{ stats.typeable }} typeable characters</div>
              </span>
            </div>
          </td>
        </tr>

        <tr>
          <td>elapsted time</td>
          <td class="value">{{ $filters.minutes(stats.seconds) }}</td>
          <td class="derivation"></td>
        </tr>

        <tr>
          <td>wpm</td>
          <td class="value">{{ $filters.number(wpm) }}</td>
          <td class="derivation">
            <div class="computation">
              <span class="fraction">
                <div class="numerator">{{ stats.typeable }} typeable characters</div>
                <div class="denominator">{{ charsPerWord }} characters per word</div>
              </span>
              <span class="times">x</span>
              <span class="fraction">
                <div class="numerator">1</div>
                <div class="denominator">{{ $filters.minutes(stats.seconds) }}</div>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ResultSection",
  props: {
    stats: Object,
  },
  data() {
    return {
      charsPerWord: 5,
    };
  },
  computed: {
    minutes() {
      const { seconds } = this.stats;
      return seconds / 60;
    },
    total() {
      const { typeable, incorrect, collateral, backspaces } = this.stats;
      return typeable + incorrect + collateral + backspaces;
    },
    overhead() {
      const { typeable } = this.stats;
      return (this.total - typeable) / typeable;
    },
    wpm() {
      const { typeable } = this.stats;
      return (typeable / this.charsPerWord) * (1 / this.minutes);
    },
  },
  mounted() {
    const ele = this.$refs["results"];
    ele.scrollIntoView({ behavior: "smooth" });
    /* window.scrollTo(0, ele.offsetTop); */
  },
};
</script>

<style lang="scss" scoped>
td {
  text-align: left;
}

.results {
  display: flex;
  flex-direction: column;

  h1 {
    padding-bottom: 20px;
  }

  tr td {
    padding: 0 0.5em 2em;
    line-height: 1.1em;
  }
}

.derivation {
  width: 40%;
  color: #a2a2a2;
  font-size: 14px;
}

.value {
  color: #555;
}

.results-table {
  width: 100%;
  font-size: 1.5em;

  & > tbody > tr > td:first-child {
    text-align: right;
    color: #888;
    width: 40%;
  }

  & > tbody > tr > td:nth-child(2) {
    width: 10%;
    padding-left: 1em;
  }
}

.calculations {
  font-size: 1em;
  line-height: 1.1em;
  tr td {
    text-align: left;
    padding: 0.25em 0.5em;
  }
  tr td:first-child {
    width: 5%;
  }
  tr td:nth-child(2) {
    width: 2em;
    text-align: right;
  }
}
.incorrectCount {
  color: var(--np-incorrect);
}
.collateralCount {
  color: var(--np-wascollateral);
}

.computation {
  display: block;
  position: relative;
}

.fraction {
  display: inline-block;
  text-align: center;
  div {
    padding: 0.25em 0;
    margin: 0 0.2em;
  }
  .numerator {
    border-bottom: 1px solid #999;
  }
}

.times {
  display: inline-block;
  font-size: 2em;
  padding: 0 0.25em 0.5em;
}
</style>
