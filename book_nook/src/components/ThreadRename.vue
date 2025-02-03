<template>
  <v-menu 
    v-model="isOpen"
    @update:modelValue="emitMenuState"
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
          <v-btn 
            height="25px" 
            width="25px" 
            size="x-small" 
            icon="mdi-check" 
            variant="tonal"
          >
          </v-btn>
        </template>
      </v-text-field>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "ThreadRename",
  data() {
    return {
      threadName: "",
      isOpen: false,
    };
  },

  methods: {
    validateRequired(value) {
      return value.trim().length > 0 || "Thread name can't be empty";
    },
    validateMaxLength(value) {
      return value.length <= 25 || "Thread name must be 25 characters or less";
    },
    emitMenuState() {
      let newState = this.isOpen
      this.$emit('menuStateChange', newState);
    },
  },
};
</script>

<style scoped>
</style>