<template>
  <v-menu 
    v-model="isOpen"
    @update:modelValue="emitMenuState"
    activator="parent"
    :close-on-content-click="false"
    location="bottom"
  >
    <v-card class="px-1 pb-1 pt-2">
      <v-form ref="threadRename">
        <v-text-field 
          label="New Thread Name" 
          density="compact"
          variant="underlined" 
          hide-details="auto"
          width="200px"
          v-model="newName"
          :rules="[validateRequired, validateMaxLength]"
        >
          <template v-slot:append-inner>
            <v-btn 
              height="20px" 
              width="20px" 
              size="x-small" 
              icon="mdi-check" 
              variant="tonal"
              @click="renameSubmit"
            >
            </v-btn>
          </template>
        </v-text-field>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "ThreadRename",
  
  data() {
    return {
      newName: "",
      isOpen: false,
    };
  },

  props: {
    id: Number,
  },

  methods: {
    renameSubmit() {
      this.$refs.threadRename.resetValidation();
      this.$store.dispatch('threadStore/updateThread', {'name': this.newName});
    },

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