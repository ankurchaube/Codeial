class ChatEngine {
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://:5000');

        if(this.userEmail){
            this.connectHandler();
        }
    }

    connectHandler(){
        this.socket.on('connect', function(){
            console.log('connection estliblised using sockets...')
        })
    }
}