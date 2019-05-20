<template>
    <div>
        <div>
            <h2>Lijst met Personen</h2>
            <b-list-group style="margin: 5%">
                <b-list-group-item v-for="name in personNameList" :key="name" v-on:click="loadPerson(name)">
                    {{name}}
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Home",
        data(){
            return{
                personNameList: []
            }
        },
        mounted() {
            axios.get('http://localhost:8080/Chatturbait/resources/Person/getAll', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                    var data = response.data;
                    for(var i = 0; i < data.length; i++){
                        this.personNameList.push(data[i].name);
                    }
                }).catch((error) => {
                    alert('geen rechten');
                });

        },
        methods:{
            loadPerson: function (name) {
                console.log(name);
                this.$router.push('/chat/'+ name);
            }
        }
    }
</script>

<style scoped>

</style>