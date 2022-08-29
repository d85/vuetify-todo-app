import Vue from 'vue'
import Vuex from 'vuex'

import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  getters: {
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },   
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    toggleTask(state, id) {
      const task = state.tasks.find(task => task.id === id)
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.find(task => task.id === payload.id)
      task.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      const task = state.tasks.find(task => task.id === payload.id)
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask)
        .then(() => {
          commit('addTask', newTask)
          commit('showSnackbar', 'Task added!')
        })
    },
    toggleTask({ state, commit }, id) {
      const task = state.tasks.find(task => task.id === id)
      db.collection('tasks').doc({ id: id })
        .update({
          done: !task.done
        })
        .then(() => {
          commit('toggleTask', id)
        }) 
    },
    deleteTask({ commit }, taskId) {
      db.collection('tasks').doc( { id: taskId } )
        .delete()
        .then(() => {
          commit('deleteTask', taskId)
          commit('showSnackbar', 'Task deleted!')
        })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc( { id: payload.id } )
        .update({
          title: payload.title
        })
        .then(() => {
          commit('updateTaskTitle', payload)
          commit('showSnackbar', 'Task updated!')
        })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc( { id: payload.id } )
        .update({
          dueDate: payload.dueDate
        })
        .then(() => {
          commit('updateTaskDueDate', payload)
          commit('showSnackbar', 'Due date updated!')
        })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks);
      })
    }
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      } else {
        return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
      }
    }
  }
})
