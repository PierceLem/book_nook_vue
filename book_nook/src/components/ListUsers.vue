<template>
  <v-list-item class="participant-list mx-2 pa-0">
    <template v-slot:prepend>
      <v-avatar 
        size="28px" 
        :image="avatar"
      >
      </v-avatar>
    </template>

    <template v-slot:title>
      <div class="d-flex flex-column">
        <span class="text-body-2 mt-1">{{ name }}</span>
        <span class="text-caption text-medium-emphasis">{{ email }}</span>
      </div>
    </template>

    <template v-slot:append>
      <v-btn
        v-if="icon"
        height="22px"
        width="22px"
        icon
        :variant="btnType"
        class="ml-1"
        :disabled="disabled"
        @click="$emit('userClick')"
      >
        <v-icon size="x-small">{{ icon }}</v-icon>
      </v-btn>
    </template>
  </v-list-item>

  <v-divider class="ml-12"></v-divider>
</template>

<script>
export default {
  name: "ListUsers",

  props: {
    avatar: String,
    name: String,
    email: String,
    btnType: String,
    icon: {
      String, 
      required: false,
    },
    disabled: {
      Boolean,
      required: false,
    },
  },

  emits: ["userClick"],
};
</script>