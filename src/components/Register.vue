<template>
    <div id="register">
        <h1>Register</h1>
        <input type="text" name="username" v-model="username" placeholder="Username" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <input type="text" name="email" v-model="email" placeholder="Email"/>
        <button type="button" v-on:click="register()">Register</button>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    import axios from 'axios';
    const qs = require('qs');
    export default {
        name: "Register",
        data(){
            return {
                username: '',
                password: '',
                email: '',
                error: false
            }
        },
        methods:{
            register(){
                axios.post('http://localhost:8080/Chatturbait/resources/Person',
                    qs.stringify(
                        {name: this.username, password: this.password, email: this.email}
                    ))
                    .then(() => {
                        this.error = false;
                        this.$router.push('/Home')
                    })
                    .catch(() => this.error = 'register failed!')
            },
        }
    }
</script>

<style scoped>

</style>