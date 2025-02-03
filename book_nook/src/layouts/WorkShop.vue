<template>
  <div class="workshop">
    <v-container 
      width="500px" 
      height="400px"
    >
      <v-btn 
        size="small"
        variant="plain"
        icon
        class="mr-2"
      >
        <v-icon size="large">
          mdi-chat-plus-outline
        </v-icon>
        
        <v-menu 
          activator="parent"
          :close-on-content-click="false"
          location="bottom"
        >
          <v-card class="pa-2">
            <v-text-field 
              label="Rename Thread" 
              variant="underlined" 
              width="200px"
              v-model="threadName"
              :rules="[validateRequired, validateMaxLength]"
            >
              <template v-slot:append-inner>
                <v-btn height="25px" width="25px" size="x-small" icon="mdi-check" variant="tonal"></v-btn>
              </template>
            </v-text-field>
          </v-card>
        </v-menu>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "WorkShop",
  data() {
    return {
      threadName: "",
    };
  },
  methods: {
    validateRequired(value) {
      return value.trim().length > 0 || "Thread name can't be empty";
    },
    validateMaxLength(value) {
      return value.length <= 25 || "Thread name must be 25 characters or less";
    },
  },
};
</script>

<style scoped>
.workshop {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
