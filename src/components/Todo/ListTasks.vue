<template>
  <v-list
    class="pt-0"
    flat
  >
    <the-task
      v-for="task in $store.state.tasks"
      :key="task.id"
      :task="task"
    />
  </v-list>
</template>

<script>
export default {
  components: {
    'the-task': require('@/components/Todo/TheTask.vue').default
  }
}
</script>
