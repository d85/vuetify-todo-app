
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >

      <v-img
        class="pa-4 pt-6"
        src="mountains.jpg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar color="pink" size="70" class="mb-2">
          <span class="white--text text-h4">DC</span>
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Dan</div>
        <div class="white--text text-subtitle-2">d85</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :to="item.to" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="mountains.jpg" height="170">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-container class="pa-0" fluid>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <the-search />
        </v-row>
        <v-row>
          <v-app-bar-title
            class="text-h4 ml-4"
          >
            Vuetify Todo
          </v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <the-snackbar/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    'the-search': require('@/components/Tools/TheSearch.vue').default,
    'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
    'the-snackbar': require('@/components/Shared/TheSnackbar.vue').default
  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: "/" },
      { title: 'About', icon: 'mdi-help-box', to: "/about" },
    ],
  }),
}
</script>

<style lang="sass">
.v-app-bar-title__content
  width: 100% 
</style>
