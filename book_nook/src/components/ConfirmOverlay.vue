<template>
  <v-overlay
    v-model="internalOverlay"
    class="align-center justify-center"
    contained
  >
    <v-card class="py-0 px-2 d-flex flex-column align-center justify-center" position="relative" max-width="275px">
      <div class="d-flex flex-column align-center px-2 pt-4 pb-2">
        <v-avatar 
          size="48"
          class="mb-2"
          :image="avatar"
        ></v-avatar>
        <span class="text-indigo">{{ username }}</span>
      </div>

      <v-divider color="indigo" class="w-100"></v-divider>

      <div class="d-flex flex-row justify-space-between w-100 pa-2">
        <v-btn
          icon
          tile
          rounded
          size="24px"
          variant="tonal"
          color="indigo"
          class="mr-2"
          @click="internalOverlay = false"
        >
          <v-icon size="16px">mdi-undo-variant</v-icon>
        </v-btn>

        <v-btn 
          density="compact" 
          variant="tonal" 
          :color="color" 
          @click="$emit('Confirm')"
        >{{ action }}</v-btn>
      </div>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "ConfirmOverlay",

  props: {
    modelValue: Boolean,
    avatar: String,
    username: String,
    action: String,
  },

  emits: ['Confirm'],

  computed: {
    color() {
      return this.action === 'kick' ? 'red' : 'green'
    },

    internalOverlay: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>