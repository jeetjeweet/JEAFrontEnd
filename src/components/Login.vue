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
           // this.checkCurrentLogin()
        },
        updated () {
           // this.checkCurrentLogin()
        },
        methods: {
            // checkCurrentLogin () {
            //     if (localStorage.token) {
            //         this.$router.replace(this.$route.query.redirect || '/')
            //     }
            // },
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    axios.post('http://localhost:8080/Chatturbait/resources/authentication',
                        qs.stringify(
                        {name: this.input.username, password: this.input.password, authCode: this.input.authCode}),
                        { headers: {'Content-Type' : 'application/x-www-form-urlencoded'}}
                        )
                        .then((response) => { this.loginSuccessful(response)})
                        .catch(() => this.loginFailed())
                } else {
                    console.log("A username and password must be present");
                }
            },
            loginSuccessful (response) {
                console.log("loginsucces" + JSON.stringify(response));
                if (!response.data) {
                    this.loginFailed();
                    return
                }
                var splitonce = response.data.split("|");
                var token = splitonce[0].split(":")[1];
                var name = splitonce[1].split(":")[1];
                console.log('token: '+token + 'name: ' + name);
                localStorage.token = token;
                localStorage.name = name;
                this.error = false;
                this.$router.push('/Home');
                //this.$router.replace(this.$route.query.redirect || '/Home');
            },

            loginFailed () {
                this.error = 'Login failed!';
                delete localStorage.token;
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