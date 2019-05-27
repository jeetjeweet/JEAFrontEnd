<!--<template>-->
<!--    <div>-->
<!--        <div id="messages">-->
<!--            <b-list-group style="margin: 5%">-->
<!--                <b-list-group-item v-for="m in messages" :key="m">-->
<!--                    {{m}}-->
<!--                </b-list-group-item>-->
<!--            </b-list-group>-->
<!--        </div>-->
<!--        <div id="input">-->
<!--            <b-input-group prepend="Message" class="mt-3">-->
<!--                <b-form-input></b-form-input>-->
<!--                <b-input-group-append>-->
<!--                    <b-button variant="outline-success" v-bind:onclick="sendmessage">Send</b-button>-->
<!--                </b-input-group-append>-->
<!--            </b-input-group>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<template>
    <div class="card mt-3">
        <div class="card-body">
            <div class="card-title">
                <h3>Chat Group</h3>
                <hr>
            </div>
            <div class="card-body">
                <div class="messages" v-for="(msg, index) in messages" :key="index">
                    <p><span class="font-weight-bold">{{ msg.message.from}}: </span>{{ msg.message.message }}</p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <form @submit.prevent="sendMessage">
                <div class="gorm-group pb-3">
                    <label for="message">Message:</label>
                    <input type="text" v-model="message" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        name: "Chat",
        data(){
            return {
                user: localStorage.getItem('name'),
                receiver: '',
                socket: io('localhost:8089'),
                messages: [],
                message: ''
            }
        },
        mounted() {
            this.receiver = this.$route.params.username;
            console.log('receiver: '+this.receiver);
            this.socket.emit('join', this.receiver);
            this.socket.on('message', (data) => {
                this.messages.push(data);
            });
        },
        methods: {
            connect: function () {
            },
            sendMessage: function (e) {
                e.preventDefault();

                this.socket.emit('message' , {
                    to: this.receiver,
                    from: this.user,
                    message: this.message
                });
                this.message = '';

            }
        }
    }
</script>

<style scoped>

</style>