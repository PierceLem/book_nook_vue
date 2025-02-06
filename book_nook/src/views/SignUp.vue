<template>
  <v-card
    class="pa-8 w-100"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-container class="d-flex justify-center mb-4">
      <p class="text-h4 font-weight-medium">Sign Up</p>
    </v-container>

    <div class="d-flex align-center mb-2">
      <v-divider class="flex-grow-1"></v-divider>
    </div>

    <div class="d-flex justify-center pt-2">
      <span class="text-subtitle-2 font-weight-light">Sign up with email</span>
    </div>

    <v-form ref="form" fast-fail @submit.prevent="submitForm" class="my-4">
      <v-text-field
        v-model="username"
        :rules="rules.username"
        label="Username"
        counter=""
        class="mb-3"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="rules.email"
        label="E-mail Address"
        class="mb-3"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.password"
        :type="show ? 'text' : 'password'"
        hint="At least 8 characters"
        label="Password"
        counter
        @click:append-inner="show = !show"
      ></v-text-field>

      <v-container class="w-100 d-flex justify-center pa-0">
        <v-btn class="mt-4" @click="submitForm">Create account</v-btn>
      </v-container>
    </v-form>

    <div class="d-flex justify-center">
      <v-btn variant="plain" size="x-small" :to="{ name: 'LogIn' }">
        Already have an account? Log in here.
      </v-btn>
    </div>
    
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUp',
  data () {
    return {
      show: false,
      username: '',
      email: '',
      password: '',
      errors: [],
      rules: {
        username: [
          value => !!value || 'Username is required.',
          value => value.length >= 6 || 'Username must be at least 6 characters.',
          value => /^[a-zA-Z0-9_]+$/.test(value) || 'Username can only contain letters, numbers, and underscores.',
        ],
        email: [
          value => !!value || 'Email is required.',
          value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email must be valid.',
        ],
        password: [
          value => !!value || 'Password is required.',
          value => value.length >= 8 || 'Password must be at least 8 characters.',
          value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter.',
          value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter.',
          value => /[0-9]/.test(value) || 'Password must contain at least one number.',
        ],
      },
    }
  },
  methods: {
    submitForm() {
      const form = this.$refs.form;
      if (form.validate()) {
        this.signup();
      } else {
        console.log('Form validation failed.');
      }
    },

    signup() {
      const formData = {
        username: this.username,
        email: this.email,
        password: this.password
      }

      axios
        .post("/api/v1/users/", formData)
        .then(response => {
          console.log(response)

          this.$router.push('/auth/login')
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }

            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            console.log(JSON.stringify(error.message))
          } else {
            console.log(JSON.stringify(error))
          }
        })
    }
  },
}
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
</style>