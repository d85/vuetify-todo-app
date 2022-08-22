<template>
  <v-text-field
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
    class="pa-3"
    append-icon="mdi-plus"
    label="Add Task"
    clearable
    hide-details
    outlined
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: '',
    }
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
    }
  }
}
</script>
