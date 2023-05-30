class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        const response = await this.chats.add(chat);
        return this;
    }
    getChats(callback){
       this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(element => {
                if (element.type === 'added'){
                    callback(element.doc.data());
                }
            });
        });
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updareRoom(room){
        this.room = room;
        if (this.unsub){
            this.unsub();
        }
    }
}


// r.addChat('hello').then(()=>{
//     console.log('chat added');
// }).catch(err => {console.log(err)});
