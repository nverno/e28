import { createStore, createLogger } from 'vuex';
import { axios } from "@/common/app.js";
import { groupBy } from 'lodash';

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  state() {
    return {
      // each lists has an items key containing associated tasks
      lists: [],
      user: null,
    };
  },
  mutations: {
    setLists(state, payload) {
      state.lists = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    // Fetch all lists + tasks for current user
    fetchLists(context, { userId }) {
      axios.get("tasklist").then(response => {
        let lists = response.data.tasklist.filter(list => list.user_id == userId);
        axios.get('task').then(resp => {
          const tasks = groupBy(resp.data.task, x => x.tasklist_id);
          lists.forEach(list => list.items = tasks[list.id]);
          context.commit('setLists', lists);
        });
      });
    },
    authUser(context) {
      return new Promise((resolve) => {
        axios.post('auth').then((response) => {
          if (response.data.authenticated) {
            context.commit('setUser', response.data.user);
          } else {
            context.commit('setUser', false);
          }
          
          resolve();
        });
      });
    },
  },
  getters: {
    getListById(state) {
      return function (id) {
        return state.lists.filter((list) => {
          return list.id == id;
        }, id)[0];
      };
    }
  },
});
