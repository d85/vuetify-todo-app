<template>
  <v-snackbar
    v-model="$store.state.snackbar.show"
  >
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        @click="$store.commit('hideSnackbar')"
        v-bind="attrs"
        text
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>