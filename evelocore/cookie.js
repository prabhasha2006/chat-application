
//* remember me in cookie
const setCookie = (variable,value,exdays) => {
    console.log("coooooookie")
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = variable + "=" + value + ";" + expires + ";path=/";
}

const getCookie = (EveloCodeRedDragon) => {
    let EevelocoreChatId = EveloCodeRedDragon + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(EevelocoreChatId) == 0) {
        return c.substring(EevelocoreChatId.length, c.length);
      }
    }
    return "";
}
  
const checkCookie = () => {
    let user = getCookie("EevelocoreChatId");
    if (user != "") {
        emits.value = user
    }/*  else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("EevelocoreChatId", user, 30);
       }
    } */
}
checkCookie()