<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">

        <span class="font-weight-light"> Genetic Programming and Neural Nets</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
    app
    v-model="drawer">
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>


    <v-content>
        <router-view />
    </v-content>

    <v-footer app>
    </v-footer>
  </v-app>
</template>



<script>
export default {
  name: 'App',
  components: {

  },
  data: () => ({
    items: [
      { title: 'Neural Nets', icon: 'mdi-molecule', link:'/' },
      { title: 'Genetic Algorithms', icon: 'mdi-dna', link:'/algorithms' },
      { title: 'Genetic Programming', icon: 'mdi-transit-connection-variant' , link:'/programming'},
    ],
    right: null,
    drawer: null,
  }),
};
</script>
