<template>
  <div class="home">
    <v-text-field @click:append="addTask" @keyup.enter="addTask" append-icon="mdi-plus" class="pa-3" clearable
      hide-details label="Add Task" outlined v-model="newTaskTitle"></v-text-field>
    <v-list v-if="$store.state.tasks.length" class="pt-0" flat>
      <div :key="task.id" v-for="task in $store.state.tasks">

        <v-list-item :class="{ 'blue lighten-5': task.done }" @click="$store.commit('toggleTask', task.id)">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">{{ task.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="$store.commit('deleteTask', task.id)" icon>
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-divider></v-divider>
      </div>
    </v-list>
    <div v-else class="no-tasks">
      <v-icon size="100px" color="primary">
        mdi-check
      </v-icon>
      <div class="text-h5 primary--text">
        No tasks
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      newTaskTitle: '',
    }
  },
  methods: {
    addTask() {
      this.$store.commit('addTask', this.newTaskTitle)
      this.newTaskTitle = ''
    }
  }
}
</script>

<style lang="sass">
.no-tasks 
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  opacity: 0.5
</style>