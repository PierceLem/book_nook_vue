<template>
  <v-card
    class="pa-8 w-100"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-container class="d-flex justify-center">
      <p class="text-h4 font-weight-medium">Log In</p>
    </v-container>

    <v-container class="d-flex justify-center mb-2 px-0">
      <v-btn block elevation="0" class="px-0">
        <v-img src="@/assets/google-icon.png" height="25" width="25" class="mr-3"></v-img>
        Sign in with Google
      </v-btn>
    </v-container>

    <div class="d-flex align-center mb-2">
      <v-divider class="flex-grow-1"></v-divider>
      <span class="mx-3">OR</span>
      <v-divider class="flex-grow-1"></v-divider>
    </div>

    <div class="d-flex justify-center pt-2">
      <span class="text-subtitle-2 font-weight-light">Login with your account</span>
    </div>

    <v-form class="my-4" ref="form">
      <v-text-field
        v-model="email"
        :rules="rules.email"
        label="E-mail Address"
        class="mb-3"
        @click="errors = ''"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.password"
        :type="show ? 'text' : 'password'"
        label="Password"
        @click="errors = ''"
        @click:append-inner="show = !show"
      ></v-text-field>

      <div v-if="errors" class="w-100 pt-1 d-flex justify-center">
        <span class="non-field-errors">{{ errors }}</span>
      </div>

      <v-container class="w-100 d-flex justify-center pa-0">
        <v-btn 
          class="mt-4" 
          @click="submitForm"
        >
          Log In
        </v-btn>
      </v-container>
    </v-form>

    <div class="d-flex justify-center">
      <v-btn variant="plain" size="x-small" :to="{ name: 'SignUp' }">
        Dont have an account? Create one here.
      </v-btn>
    </div>

  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      show: false,
      email: '',
      password: '',
      errors: '',
      rules: {
        email: [
          value => !!value || 'Email is required.',
          value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email must be valid.',
        ],
        password: [
          value => !!value || 'Password is required.',
        ],
      },
    };
  },
  methods: {
    submitForm() {
      const form = this.$refs.form;
      if (form.validate()) {
        this.login();
      } else {
        console.log('Form validation failed.');
      }
    },

    login() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");

      const formData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("/api/v1/token/login/", formData)
        .then((response) => {
          console.log(response);

          const token = response.data.auth_token;

          this.$store.commit("auth/setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;

          localStorage.setItem("token", token);

          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.non_field_errors) {
              this.errors = error.response.data.non_field_errors.join(" ");
            }

            console.log(JSON.stringify(error.response.data));
          } else if (error.message) {
            console.log(JSON.stringify(error.message));
          } else {
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>

<style scoped>
.logo-row {
  border-radius: 50rem !important;
  background-color: #37474f;
}
.page-name {
  font-size: larger;
  color: #37474f;
}

.non-field-errors {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  color: rgb(176, 0, 32);
}
</style>
