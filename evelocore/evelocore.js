const lowerCase = (text) => {
    return text.replace(/ /gi,'').toLowerCase()
}
let onMonitoring = true
let unreads = 0
let chatSound = new Audio('./recieveOn.mp3')
chatSound.volume = .3
let onServer = false
const socket = io()
//
const zero10 = (number) => {
    if(number < 10){
        return '0'+ number
    }else{
        return number
    }
}
const bubble = (msg, sender, client) => {
    var D = new Date()
    if(!client){
        if(msg.startsWith('web::')){
            msg = msg.replace(/web::/gi,'').replace(/https:\/\/youtu.be|https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtube.com\/shorts\//g, "https://www.youtube.com/embed/")
            return `
            <div class="messages ${sender}">
                <div class="Content">
                    <p>
                        <iframe src="${msg}" frameborder="0"></iframe>
                    </p>
                    <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                </div>
            </div>`
        }else{
            if(msg.startsWith('html::')){
                msg = msg.replace(/html::/gi,'')
                return `
                <div class="messages ${sender}">
                    <div class="Content">
                        <p>${msg}</p>
                        <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                    </div>
                </div>`
            }else{
                msg = msg.replace(/\n/gi,'<br>').replace(/ /gi, '&nbsp;').replace(/</gi, '&lt;')
                return `
                <div class="messages ${sender}">
                    <div class="Content">
                        <p>${msg}</p>
                        <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                    </div>
                </div>`
            }
        }
    }else{
        if(msg.startsWith('web::')){
            msg = msg.replace(/web::/gi,'').replace(/https:\/\/youtu.be|https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtube.com\/shorts\//g, "https://www.youtube.com/embed/")
            return `
            <div class="messages ${sender}">
                <div class="Content">
                    <h5 style="color: ${selectColor(client[0])}">${client}</h5>
                    <p>
                        <iframe src="${msg}" frameborder="0"></iframe>
                    </p>
                    <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                </div>
            </div>`
        }else{
            if(msg.startsWith('html::')){
                msg = msg.replace(/html::/gi,'')
                return `
                <div class="messages ${sender}">
                    <div class="Content">
                        <h5 style="color: ${selectColor(client[0])}">${client}</h5>
                        <p>${msg}</p>
                        <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                    </div>
                </div>`
            }else{
                msg = msg.replace(/\n/gi,'<br>').replace(/ /gi, '&nbsp;').replace(/</gi, '&lt;')
                return `
                <div class="messages ${sender}">
                    <div class="Content">
                        <h5 style="color: ${selectColor(client[0])}">${client}</h5>
                        <p>${msg}</p>
                        <h4>${zero10(D.getHours())} : ${zero10(D.getMinutes())}</h4>
                    </div>
                </div>`
            }
        }
    }
}
const sendMessage = (msg) => {
    if(msg.replace(/ /gi,"").length == 0){
        alert("Can't send empty messages!!!")
        return
    }
    if(msg.length > 55000){
        alert("Ooops! Big messages!!!")
        return
    }
    var textChat = document.getElementsByClassName("chatBody")[0]
    textChat.innerHTML += bubble(msg, 'sentMsg')
    messageInput.value = ""
    textChat.scrollTo(0, textChat.scrollHeight);
    // Emit a custom event to the server
    socket.emit('server-message', 
    { 
        from : emits.value || "a",
        to: listens.value || "b",
        isOnServer: onServer,
        message: msg
    })
    chatSound.play()
}
const selectColor = (char) => {
    if(char.match(/a|g|m|s|y|5/gi)){return "#00aeff"}
    if(char.match(/b|h|n|t|z|6/gi)){return "#66ff00"}
    if(char.match(/c|i|o|u|1|7/gi)){return "#ff5100"}
    if(char.match(/d|j|p|v|2|8/gi)){return "#00ffbf"}
    if(char.match(/e|k|q|w|3|9/gi)){return "#fbff00"}
    if(char.match(/f|l|r|x|4|-/gi)){return "#ff00f2"}
}
socket.on('client-message', (data) => {
    if(onServer){
        if(!data.isOnServer){
            if(data.to === emits.value){
                eveloCoreAlert("New Message From "+data.from.toUpperCase(), data.from, data.message, '#55f', 10000)
            }
            return
        }
        if(data.to === listens.value){
            if(data.from === emits.value){
                return
            }
            var D = new Date()
            var textChat = document.getElementsByClassName("chatBody")[0]
            textChat.innerHTML += bubble(data.message, 'recievedMsg', data.from)
            if(!onMonitoring){
                unreads++
                title.innerHTML = listens.value.toUpperCase() + " Server (" +unreads+ ")"
            }
            chatSound.play()
        }
    }else{
        if(data.isOnServer){return}
        if(data.to === emits.value){
            if(data.from === listens.value){
                var D = new Date()
                var textChat = document.getElementsByClassName("chatBody")[0]
                textChat.innerHTML += bubble(data.message, 'recievedMsg')
                if(!onMonitoring){
                    unreads++
                    title.innerHTML = listens.value.toUpperCase() + " New (" +unreads+ ")"
                }
                chatSound.play()
                //console.log('Received :', data.message);
            }else{
                eveloCoreAlert("New Message From "+data.from.toUpperCase(), data.from, data.message, '#55f', 10000)
            }
        }
    }
    textChat.scrollTo(0, textChat.scrollHeight);
    //console.log(data)
})
messageInput.addEventListener('keydown', (event) => {
    if (event.keyCode == 13 && event.shiftKey) {
        return
    }else{
        if (event.key === 'Enter') {
            sendMessage(messageInput.value)
            event.preventDefault();
            // Perform desired actions here
        }
    }
})
if(document.addEventListener){
    document.addEventListener("visibilitychange", function(event) {
        //console.log(event)
        if(document.visibilityState == 'hidden') {
            // page is hidden
            console.log("onMonitoring = false")
            onMonitoring = false
            chatSound = new Audio('./recieveOff.mp3')
            chatSound.volume = .3
        } else {
            // page is visible
            console.log("onMonitoring = true")
            unreads = 0
            onMonitoring = true
            chatSound = new Audio('./recieveOn.mp3')
            chatSound.volume = .3
            title.innerHTML = listens.value.toUpperCase() + " ONLINE"
        }
    });
}
//notify
const eveloCoreAlert = (msg,returnData,returnMessage,colour,duration) => {
    duration = duration || 10000
    var notificationContain = document.getElementsByClassName("primary-notification")[0]
    if(!msg){
        notificationContain.classList.remove("primary-notification-popup")
        return
    }
    var notification = document.getElementById("primary-notification-text")
    notification.innerHTML = msg
    var notification = document.getElementById("primary-notification-head")
    notification.style.color = colour
    var notification = document.getElementById("primary-notification-got")
    notification.style.color = colour
    notification = document.getElementsByClassName("primary-notification-contain")[0]
    notification.style.border = "4px solid "+colour
    notification.style.borderLeft = "10px solid "+colour
    //notification.style.boxShadow = "00 1px 5px 1px "+colour
    notificationContain.classList.add("primary-notification-popup")
    setTimeout(eveloCoreAlert,duration)
    chatSound.play()
    if(!onMonitoring){
        title.innerHTML = returnData.toUpperCase() + " is inviting..."
    }
    document.getElementById("primary-notification-cancel").addEventListener("click", ()=>{ eveloCoreAlert() })
    document.getElementById("primary-notification-got").addEventListener("click", ()=>{ 
        var textChat = document.getElementsByClassName("chatBody")[0]
        textChat.innerHTML = `
        <div class="messages holdingdMsg">
            <div class="Content">
            <p>Fast chat app with web socket by <b>Kumuthu Prabhasha.</b> V6.7</p>
            </div>
        </div>
        <div class="messages recievedMsg">
            <div class="Content">
                <p>${returnMessage}</p>
            </div>
        </div>`
        messageInput.value = ""
        listens.value = returnData
        theirName.innerHTML = returnData
        notificationContain.classList.remove("primary-notification-popup")
        //chatServerOpen()
        document.getElementById("chatServerOpenBtn").innerText = "Join A Chat Server"
        serverLabel.innerHTML = "Client"
        onServer = false
     })
}
const chatServerOpen = (btn) => {
    btn = document.getElementById("chatServerOpenBtn")
    if(!onServer){
        dp.src = "https://cdn-icons-png.flaticon.com/512/1256/1256650.png"
        btn.innerText = "Join A Personal Chat"
        serverLabel.innerHTML = "Server"
        onServer = true
    }else{
        dp.src = "https://cdn-icons-png.flaticon.com/512/11498/11498793.png"
        btn.innerText = "Join A Chat Server"
        serverLabel.innerHTML = "Client"
        onServer = false
    }
}
const enterChat = () => {
    document.getElementsByClassName('homescreen')[0].style.display = 'none'
    var textChat = document.getElementsByClassName("chatBody")[0]
    if(onServer){
        textChat.innerHTML = `
        <div class="messages holdingdMsg">
            <div class="Content">
            <p>Fast chat app with web socket by <b>Kumuthu Prabhasha.</b> V6.7</p>
            </div>
        </div>
        <div class="messages holdingdMsg">
            <div class="Content">
            <p>You are on a server chat</p>
            </div>
        </div>`
    }else{
        textChat.innerHTML = `
        <div class="messages holdingdMsg">
            <div class="Content">
            <p>Fast chat app with web socket by <b>Kumuthu Prabhasha.</b> V6.7</p>
            </div>
        </div>`
    }
}
//
let locationUrl = location.href
locationUrl = new URL(locationUrl)
if(locationUrl.searchParams.get("client")){
    listens.value = locationUrl.searchParams.get("client")
    theirName.innerHTML = listens.value
    if(locationUrl.searchParams.get("on")){
        if(locationUrl.searchParams.get("on") === "server"){
            chatServerOpen()
        }
    }
}else{
}