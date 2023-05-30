const chatlist = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat');
const curn = document.querySelector('.sss');
const newName = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    r.addChat(message).then(() => {
        newChatForm.reset();
    }).catch(err =>{
        console.log(err);
    });
})

newName.addEventListener('submit', e => {
    e.preventDefault();
    const name = newName.name.value.trim();
    r.updateName(name);
    newName.reset();
    const ht = `
    <span>
        ${name}
    </span>
    `
    curn.innerHTML = ht;
    
});
let us ;
if (localStorage.getItem('username')){
    us  = localStorage.getItem('username')
}else{
    us = 'Anon';
}


rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON'){
        chatui.clear();
        r.updareRoom(e.target.getAttribute('id'));
        rooms.st
        r.getChats((chat) => {
            chatui.render(chat);
        })
    }
})
const chatui = new ChatUi(chatlist);

const r = new Chatroom('gaming', us);

const ht = `
    <span>
        ${r.username}
    </span>
    `
    curn.innerHTML = ht;

r.getChats((data =>{
   chatui.render(data);
}))