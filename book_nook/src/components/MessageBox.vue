<template>
  <v-container class="chat-container">
    <v-app-bar 
      elevation="0" 
      border="sm" 
      class="pl-2"
    >
      <template v-slot:append>
        <v-btn 
          icon 
          variant="plain" 
          class="ml-4"
        >
          <v-icon size="large">mdi-account-edit-outline</v-icon>
        </v-btn>
      </template>

      <template v-slot:prepend>
        <v-avatar 
          variant="elevated" 
          color="blue-grey-darken-3" 
          size="46"
        >
          <v-icon 
            size="large" 
            color="white"
          >
            mdi-account-group
          </v-icon>
        </v-avatar>

        <v-container class="d-flex flex-column pl-2">
          <div>
            <v-btn 
              variant="text" 
              icon="mdi-pencil" 
              size="x-small" 
              class="mr-1"
            >
            </v-btn>

            <span class="text-body-1">Group Chat</span>
          </div>

          <span class="text-caption text-grey-darken-1 pl-2">Last active 3 hrs ago</span>
        </v-container>
      </template>
    </v-app-bar>

    <v-textarea 
      class="send-message"
      rows="1" 
      auto-grow 
      clearable 
      max-rows="4"
    >
      <template v-slot:prepend-inner>
        <v-btn 
          icon="mdi-send" 
          variant="tonal" 
          size="small"
        >
        </v-btn>
      </template>
    </v-textarea>
  </v-container>
</template>

<script>
export default {
  name: 'MessageBox'

}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 128px);
  width: 100%;
  position: relative;
  padding: 0;
}

.send-message {
  position: absolute;
  bottom: 0px;
  margin: 0 22px;
  width: calc(100% - 44px);
}
</style>