<template>
  <div class="highlight-container">
    <div class="highlight-header">
      <div class="highlight-separator" />
      <div class="highlight-controls">
        <h4>Highlighted Language</h4>
        <table>
          <tbody>
            <tr>
              <td>Detected:</td>
              <td>{{ detected }}</td>
            </tr>
            <tr>
              <td>Change:</td>
              <td>
                <form @submit.prevent="updateLanguage">
                  <input v-model="language" type="text" />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pre>
      <code id="code" :class="languageClass">{{ code }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from "highlight.js";

/* NOTE: highlightjs and vue-highlightjs aren't working with vue3 (2/17/21) */
export default {
  name: "HighlightedCode",
  props: {
    code: String,
  },
  emits: ["highlight-code"],
  data() {
    return {
      language: "javascript",
      detected: "javascript",
    };
  },
  computed: {
    languageClass() {
      return `hljs ${this.language || "javascript"}`;
    },
  },
  mounted() {
    this.highlightAll();
  },
  methods: {
    highlightAll() {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
        this.detected = block.classList.item(block.classList.length - 1);
      });
      this.$emit("highlight-code");
    },
    updateLanguage() {
      let ele = document.querySelector("#code");
      ele.innerHTML = this.code;
      this.highlightAll();
    },
  },
};
</script>

<style lang="scss">
pre {
  text-align: left;
  font-size: 14px;
  line-height: 1.3rem;
  /* padding: 2em 0; */
  position: relative;
}

.highlight-header {
  display: flex;
}
.highlight-separator {
  flex: 1 1 90%;
}

.highlight-controls {
  display: flex;
  flex-direction: column;
  margin-bottom: -10px;
  color: #a2a2a2;
  font-size: 14px;

  input {
    text-align: center;
    outline: none;
    border: none;
    border-bottom: 1px solid grey;

    &:hover,
    &:focus {
      background-color: #fdf6e3;
    }
  }

  h4 {
    margin: 0;
    border-bottom: 1px solid grey;
    padding: 0 5px;
  }

  table tr td:first-child {
    width: 70%;
  }
}

.hightlight-container {
  margin: 0 5em 0 10%;
}
</style>
