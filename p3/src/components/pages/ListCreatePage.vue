<template>
  <div id="create-list">
    <h2>Create List</h2>

    <div class="row">
      <div>
        <label>
          Name
          <input
            id="name"
            type="text"
            v-model="data.name"
            data-test="name-input"
            @blur="validate"
          />
        </label>
        <error-field v-if="errors && 'name' in errors" :errors="errors.name" />
      </div>

      <div class="list-controls">
        <button @click="createList" data-test="create-list-button">Create From Results</button>
      </div>
    </div>

    <div id="query" class="row">
      <div>
        <div>
          <label>
            URL
            <input
              id="url"
              type="text"
              v-model="data.url"
              data-test="url-input"
              @blur="validate"
              placeholder="https://cp-algorithms.com/"
            />
          </label>
          <error-field v-if="errors && 'url' in errors" :errors="errors.url" />
        </div>

        <div>
          <label>
            Xpath
            <input
              id="xpath"
              type="text"
              v-model="data.xpath"
              data-test="xpath-input"
              @blur="validate"
              placeholder="//h3/text()"
            />
          </label>
          <error-field v-if="errors && 'xpath' in errors" :errors="errors.xpath" />
        </div>

        <div id="query-controls">
          <button @click="runQuery" data-test="xpath-button">Run Xpath Query</button>
          <button @click="runExample" data-test="xpath-button">Run Example</button>
        </div>
      </div>

      <div>
        <small>
          <p>
            Resulting query will be a node list, and the data from each node
            used as the item.
            (Ending the query with a call to text() may work.)
          </p>
        </small>
        <div id="query-results">
          <ul v-if="results">
            <li v-for="(res, index) in results" :key="index">{{ res }}</li>
          </ul>
        </div>
      </div>

      <ul v-if="backendErrors">
        <li class="error" v-for="(error, index) in backendErrors" :key="index">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";
import Validator from "validatorjs";
import ErrorField from "@/components/ErrorField.vue";
import { runQuery } from "@/common/list_api";

export default {
  name: "ListCreatePage",
  props: {},
  components: { "error-field": ErrorField },
  data() {
    return {
      data: {
        name: "",
        url: "",
        xpath: "",
      },
      results: null,
      errors: null,
      backendErrors: null,
      showConfirmation: false,
      src: null,
    };
  },
  methods: {
    validate(fields = []) {
      const rules = {
        name: "required",
        url: "required",
        xpath: "required",
      };
      let rs = !fields.length ? rules : {};
      if (fields.length) fields.forEach((f) => (rs[f] = rules[f]));

      let validator = new Validator(this.data, rs);

      if (validator.fails()) this.errors = validator.errors.all();
      else this.errors = null;

      return validator.passes();
    },
    runQuery() {
      if (this.validate(["url", "xpath"])) {
        runQuery(this.data.url, this.data.xpath).then((res) => {
          /* console.log("Xpath: ", res); */
          this.results = this.resultsToList(res);
        });
      }
    },
    runExample() {
      this.data.url = "https://cp-algorithms.com/";
      this.data.xpath = "//h3/text()";
      this.runQuery();
    },
    resultsToList(res) {
      return res.map((e) => e.data);
    },
    createItems(tasklistId) {
      return this.results.map((item) => {
        axios.post("task", {
          name: item,
          tasklist_id: tasklistId,
          done: false,
        });
      });
    },
    createList() {
      if (this.validate()) {
        axios
          .post("tasklist", {
            ...this.data,
            user_id: this.$store.state.user.id,
          })
          .then((response) => {
            if (response.data.success) {
              let tid = response.data.tasklist.id,
                items = this.createItems(tid);
              Promise.all(items).then(() => {
                this.$emit("update-lists");
              });
              this.backendErrors = [];
              this.errors = [];
              this.$router.push(`/list/${tid}`);
            } else {
              this.backendErrors = response.data.errors;
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#create-list {
  label {
    display: flex;
    align-items: center;

    input {
      margin-left: 10px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex: 60%;

    input {
      min-width: 250px;
      width: 100%;
    }

    button {
      min-width: 150px;
    }
  }
}

#query-results {
  min-width: 400px;
  min-height: 200px;
  height: 100%;
  width: 100%;
  border: 1px solid grey;
  margin: 5px 0 0 10px;
  align-items: center;
  text-align: center;
}

#name {
  min-width: 90px;
  width: 100%;
}

#query {
  display: flex;
  /* flex-direction: column; */
}

#query-results {
  width: 100%;
}
#query-controls {
  button:first-child {
    margin-right: 5px;
  }
}
</style>
