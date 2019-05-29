<template>
    <div>
        <h1>Profile</h1>
        <div v-if="person.authenticationKey && !setAuthCode">
            <h3>name: {{person.name}}</h3>
            <h3>password: {{person.password}}</h3>
            <h3>email: {{person.email}}</h3>

            <h3>2 factor authentication is set!</h3>
        </div>
        <div v-else-if="!person.authenticationKey && !setAuthCode">
            <h3>name: </h3> {{person.name}}
            <h3>password: </h3> {{person.password}}
            <h3>email: </h3> {{person.email}}
            <button v-on:click="this.enableAuth">Enable 2 factor authentication</button>
        </div>
        <div v-else>
            <h1>Save this code in google authenticator and Logout to login again.</h1>
            <h1>{{person.authenticationKey}}</h1>
            <button v-on:click="Logout">Logout</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Profile",
        data(){
            return{
                person:{
                    name: '',
                    password: '',
                    email: '',
                    authenticationKey: null
                },
                setAuthCode: false
            }
        },
        created() {
            this.getUser();
        },
        mounted() {

        },
        methods:{
            enableAuth: function(){
                axios.get('http://localhost:8080/Chatturbait/resources/Person/authKey', {
                    // headers: {token: localStorage.getItem('token')}
                }).then((response) => {
                    this.person.authenticationKey = response.data;
                    this.setAuthCode = true;
                    console.log('enableauth response data: ' + response.data);
                }).catch((error) => {
                    this.setAuthCode=false;
                    console.log(error);
                })
            },
            getUser: function() {
                axios.get('http://localhost:8080/Chatturbait/resources/Person/getSelf',
                //     {
                //     headers: {token: localStorage.getItem('token')}
                // }
                )
                    .then(
                        (response) => {
                            console.log(response.data);
                            this.person = response.data;
                            console.log('response person:' +this.person.authenticationKey);
                        })
                    .catch(
                        (err) =>{
                            console.log(err);
                        }
                    );
            },
            Logout: function() {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>