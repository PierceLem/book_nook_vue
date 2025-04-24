<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-bell" tile rounded="lg" size="52px" color="indigo-darken-3" v-bind="props">
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list class="list-item-header">
        <v-list-item class="d-flex justify-center align-center">
          <span class="text-h6"
            >Notifications Center</span
          >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-switch
            v-model="message"
            color="purple"
            label="Enable messages"
            hide-details
          ></v-switch>
        </v-list-item>

        <v-list-item>
          <v-switch
            v-model="hints"
            color="purple"
            label="Enable hints"
            hide-details
          ></v-switch>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="text" @click="menu = false"> 
          Cancel 
        </v-btn>

        <v-btn color="primary" variant="text" @click="menu = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "NotificationsMenu",

  data() {
    return {
      menu: false,
    }
  }
};
</script>

<style scoped>
</style>