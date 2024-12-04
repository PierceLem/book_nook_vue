<template>
    <div class="page-signup">
        <div class="cloumns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign up</h1>

                <form @submit.prevent="signup">
                    <div class="field">
                        <label>username</label>
                        <div class="control">
                            <input type="username" name="username" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>E-mail</label>
                        <div class="control">
                            <input type="email" name="email" class="input" v-model="email">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" name="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p 
                            v-for="error in errors" 
                            v-bind:key="error"
                        >
                            {{ error }}
                        </p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-success">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data () {
        return {
            email: '',
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
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

                    this.$router.push('/log-in')
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