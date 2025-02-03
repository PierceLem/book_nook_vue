<template>
  <v-menu 
    activator="parent"
    :close-on-content-click="false"
    location="start"
  >
    <v-card width="300px">
      <v-tabs
        v-model="tab"
      >
        <v-tab value="add" width="150px">Add Users</v-tab>
        <v-tab value="remove" width="150px">Remove Users</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="add">
          <v-list-item class="px-2 mt-2">
            <input class="custom-input" type="text" placeholder="Search Users" />
            <i class="input-icon mdi mdi-magnify"></i>
          </v-list-item>

          <v-list 
            density="compact" 
            class="py-0 px-1" 
            max-height="300px" 
            style="scrollbar-width: thin;"
          >
            <template v-for="n in 15" :key="n">
              <v-list-item
                class="participant-list mx-2 pa-0"
              >
                <template v-slot:prepend>
                  <v-avatar
                    image="https://randomuser.me/api/portraits/women/85.jpg"
                    size="26px"
                  >
                  </v-avatar>
                </template>

                <template v-slot:title>
                  <span class="text-body-2">Insert username here blah blah blah</span>
                </template>

                <template v-slot:append>
                  <v-btn 
                    size="x-small" 
                    icon="mdi-plus"
                    variant="tonal"
                    slim 
                    height="26px" 
                    width="26px" 
                    density="compact"
                    class="ml-1"
                  >
                  </v-btn>
                </template>
              </v-list-item>

              <v-divider class="ml-12" v-if="n < 15"></v-divider>
            </template>
          </v-list>
        </v-tabs-window-item>

        <v-tabs-window-item value="remove">
          <v-list 
            density="compact" 
            class="py-0 px-1" 
            max-height="300px" 
            style="scrollbar-width: thin;"
          >
            <v-list-item class="justify-center text-center py-2">
              <v-chip>
                Current Participants
              </v-chip>
            </v-list-item>

            <v-divider></v-divider>

            <template v-for="n in 3" :key="n">
              <v-list-item
                class="participant-list mx-2 pa-0"
              >
                <template v-slot:prepend>
                  <v-avatar
                    image="https://randomuser.me/api/portraits/women/85.jpg"
                    size="26px"
                  >
                  </v-avatar>
                </template>

                <template v-slot:title>
                  <span class="text-body-2">Insert username here</span>
                </template>

                <template v-slot:append>
                  <v-btn 
                    size="x-small" 
                    icon="mdi-minus"
                    variant="tonal"
                    slim 
                    height="26px" 
                    width="26px" 
                    density="compact"
                    class="ml-1"
                  >
                  </v-btn>
                </template>
              </v-list-item>

              <v-divider class="ml-12" v-if="n < 3"></v-divider>
            </template>
          </v-list>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "EditThread",
  data: () => ({
    tab: null,
  }),
};
</script>

<style scoped>

.custom-input {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px 8px 30px;
  font-size: 12px;
  width: 100%;
  max-width: 300px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.custom-input:focus {
  outline: none;
}
</style>