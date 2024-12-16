<template>
    <v-app-bar :elevation="0" class="bg-transparent">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.prevent="toggleDrawer" color="blue-grey-darken-2"
                :class="[navDrawer ? 'ml-0' : 'ml-2']"></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                    <v-btn icon color="blue-grey-darken-2" v-bind="props">
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </template>

                <v-card min-width="300">
                    <v-list class="list-item-header">
                        <v-list-item class="d-flex justify-center align-center">
                            <span class="text-h6 text-blue-grey-darken-3">Notifications Center</span>
                        </v-list-item>
                    </v-list>

                    <v-divider class="text-blue-grey-darken-4"></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-switch v-model="message" color="purple" label="Enable messages" hide-details></v-switch>
                        </v-list-item>

                        <v-list-item>
                            <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
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

            <v-divider vertical class="mx-2 my-2" color="blue-grey-darken-2" />

            <span class="mr-1 ml-3 text-body-2 font-weight-regular text-blue-grey-darken-2">
                Welcome Pierce
            </span>

            <v-btn icon color="blue-grey-darken-2">
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            menu: false,
            message: false,
            hints: false,
        };
    },
    computed: {
        ...mapState("ui", {
            navDrawer: (state) => state.navDrawer,
        }),
    },
    methods: {
        ...mapActions("ui", ["toggleDrawer"]),
    },
};
</script>
  
