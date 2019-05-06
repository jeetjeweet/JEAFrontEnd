<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <input type="text" name="authCode" v-model="input.authCode" placeholder="auth code"/>
        <button type="button" v-on:click="login()">Login</button>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    const qs = require('qs');
    export default {
        headers:{
            'Authorization': 'Bearer ' + localStorage.token
        },
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    authCode: ""
                },
                error: false
            }
        },
        created () {
            this.checkCurrentLogin()
        },
        updated () {
            this.checkCurrentLogin()
        },
        methods: {
            checkCurrentLogin () {
                if (localStorage.token) {
                    this.$router.replace(this.$route.query.redirect || '/authors')
                }
            },
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    axios.post('http://localhost:8080/Chatturbait/resources/authentication',
                        qs.stringify(
                        {name: this.input.username, password: this.input.password, authCode: this.input.authCode}),
                        { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
                        )
                        .then((response) => {console.log(JSON.stringify(response)); this.loginSuccessful(response)})
                        .catch(() => this.loginFailed())
                } else {
                    console.log("A username and password must be present");
                }
            },
            loginSuccessful (response) {
                console.log("loginsucces" + JSON.stringify(response));
                if (!response.data.token) {
                    this.loginFailed()
                    return
                }

                localStorage.token = response.data.token
                this.error = false

                this.$router.replace(this.$route.query.redirect || '/')
            },

            loginFailed () {
                this.error = 'Login failed!'
                delete localStorage.token
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>