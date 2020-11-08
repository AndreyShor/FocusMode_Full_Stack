function onRegister(){
    console.log("Hello World");
    const userEmail = document.getElementById("email").value;
    const userPass = document.getElementById("pass").value;
    const option = "Register"

    if(userPass == "" || userEmail == ""){
        console.log("You haven't entered all data")
    } else {
        
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
          } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 201) {
                var myObj = xmlhttp.responseText;
                alert(myObj);
            }
        }

        xmlhttp.open("POST", "http://localhost:800/api/signup");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlhttp.send("userPass=" + userPass + "&" + "userEmail=" + userEmail)
    }

}


function onLogin(){
    const userEmail = document.getElementById("email").value;
    const userPass = document.getElementById("pass").value;

    if(userEmail == "" || userPass == ""){
        return null
    } else {
        
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
          } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                window.location.assign('/main');
            }
        }
        xmlhttp.open("POST", "http://localhost:800/api/signin");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("userEmail=" + userEmail + "&" + "userPass=" + userPass + "&");
        console.log("Send");
    }

}

function onExit(){

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.replace("/");
        }
    }

    xmlhttp.open("GET", "http://localhost:800/api/logout");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
