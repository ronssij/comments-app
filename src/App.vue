<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-app-bar app color="white" flat>
        <h1>Aloware Blog</h1>

        <v-spacer></v-spacer>

        <h3>{{ usernameState }}</h3>
      </v-app-bar>

      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="text-h6">
            Please set your username
          </v-card-title>

          <v-card-text class="pa-3">
            <v-text-field
              v-model="username"
              placeholder="You username"
              hide-details
              outlined
              flat
            >
            </v-text-field>
          </v-card-text>

          <v-card-actions class="px-3">
            <v-spacer></v-spacer>
            <v-btn color="success" @click="setUsername" block>
              Set username
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-container class="mb-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BlogApp",

  data() {
    return {
      dialog: false,
      username: null,
    };
  },

  computed: {
    ...mapGetters({
      usernameState: "getUsername",
    }),
  },

  created() {
    if (!this.usernameState) {
      this.dialog = true;
    } else {
      this.username = this.usernameState;
      this.setUsername();
    }
  },

  methods: {
    ...mapMutations({
      setUsernameState: "setUsernameState",
    }),

    setUsername() {
      this.setUsernameState(this.username);
      this.username = null;
      this.dialog = false;
    },
  },
};
</script>
