# Chat App by socket.io
*From EveloCore*

## Requirements
> Nodejs

## npm packages
> "express": "^4.18.2"
> 
> "http": "^0.0.1-security"
> 
> "socket.io": "^4.7.2"

### About this
- ✓ Simple inbox chat
- ✓ Listen to server chat
- ✓ Notifications

## Easy Installation
Get started with npm installation:
```bash
npm install
```
Run ./index.js:
```bash
npm run start
```


## Setup manually
Get started with npm installation:
```bash
npm i express
```
```bash
npm i socket.io
```
```bash
npm i http
```
Run ./index.js:
```bash
node index.js
```

## [Demo here](https://evelocore-chat-app.onrender.com)


### Small code snippet examples

> emit to server-message
```js
socket.emit('server-message', 
    { 
        from : emits.value || "a",
        to: listens.value || "b",
        isOnServer: onServer,
        message: msg
    }
)
```
> listen to client-message
```js
socket.on('client-message', (data) => {
  console.log(data)
}
```


<p align="center">
<a href="#"><img title="Creator" src="https://img.shields.io/badge/Creator-EveloCore-red.svg?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://github.com/prabhasha2006?tab=followers"><img title="Followers" src="https://img.shields.io/github/followers/prabhasha2006?color=green&style=flat-square"></a>
<a href="https://github.com/prabhasha2006/chat-application/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/prabhasha2006/chat-application?color=white&style=flat-square"></a>
<a href="https://github.com/prabhasha2006/chat-application/network/members"><img title="Forks" src="https://img.shields.io/github/forks/prabhasha2006/chat-application?color=yellow&style=flat-square"></a>
<a href="https://github.com/prabhasha2006/chat-application/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/prabhasha2006/chat-application?label=Watchers&color=red&style=flat-square"></a>
<a href="https://github.com/prabhasha2006/chat-application"><img title="Open Source" src="https://badges.frapsoft.com/os/v2/open-source.svg?v=103"></a>
<a href="https://github.com/prabhasha2006/chat-application/"><img title="Size" src="https://img.shields.io/github/repo-size/prabhasha2006/chat-application?style=flat-square&color=darkred"></a>
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FAlipBot%2Fchat-application%2Fhit-counter&count_bg=%2379C83D&title_bg=%23555555&icon=probot.svg&icon_color=%2304FF00&title=hits&edge_flat=false"/></a>
<a href="https://github.com/prabhasha2006/chat-application/graphs/commit-activity"><img height="20" src="https://img.shields.io/badge/Maintained-No-red.svg"></a>&nbsp;&nbsp;
</p>
