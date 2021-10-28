<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-app-bar app color="white" flat>
        <h1>Aloware Blog</h1>
      </v-app-bar>

      <v-container class="mb-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BlogApp",
};
</script>
