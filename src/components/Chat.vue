<template>
    <div>
        <div id="messages">
            <b-list-group style="margin: 5%">
                <b-list-group-item v-for="m in messages" :key="m">
                    {{m}}
                </b-list-group-item>
            </b-list-group>
        </div>
        <div id="input">
            <b-input></b-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Chat",
        data(){
            return {
                receiver: '',
                websocket: null,
                messages: []
            }
        },
        mounted() {
            this.receiver = this.$route.params.username;
            console.log('receiver: '+this.receiver);
        },
        methods: {
            connect: function () {
                this.websocket = new WebSocket('http://localhost:8080/Chatturbait/resources/chat/');
                this.websocket.onmessage = function(event){
                    this.messages.push(JSON.parse(event.data));
                }

            }
        }
    }
</script>

<style scoped>

</style>