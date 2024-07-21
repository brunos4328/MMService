function spvFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    if (a.style.display === "" || a.style.display === "none") {
    a.style.display = "block";
    a.style.animation = "fade 1s linear forwards";
    b.style.display = "none";
    c.style.display = "none";
    } else {
    a.style.display = "none";
    a.style.opacity = "0";
    b.style.display = "none";
    c.style.display = "none";
    }
}

function serviceFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    if (b.style.display === "" || b.style.display === "none") {
    a.style.display = "none";
    b.style.display = "block";
    b.style.animation = "fade 1s linear forwards";
    c.style.display = "none";
    } else {
    a.style.display = "none";
    b.style.display = "none";
    b.style.opacity = "0";
    c.style.display = "none";
    }
}

function telecomFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    if (c.style.display === "" || c.style.display === "none") {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "block";
    c.style.animation = "fade 1s linear forwards";
    } else {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    c.style.opacity = "0";
    }
}

function eyeFunction() {
    var x = document.getElementById("password");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if(x.type === 'password'){
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else{
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function sidebar() {
    var y = document.getElementById("sidebar");
    var z = document.getElementById("openNav");

    if(y.style.display === 'none'){
        y.style.display = "block";
        setTimeout(() => {
            y.style.height = "100%";
        }, 10);
        z.style.display = "none";
    } else{
        setTimeout(() => {
            y.style.height = "0";
            y.style.display = "none";
            z.style.display = "inline-block";
        }, 50);
    }
  }