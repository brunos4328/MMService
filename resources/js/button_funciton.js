function spvFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    var d = document.getElementById("b2b");
    if (a.style.display === "" || a.style.display === "none") {
    a.style.display = "block";
    a.style.animation = "fade 1s linear forwards";
    b.style.display = "none";
    c.style.display = "no>removene";
    d.style.display = "none";
    } else {
    a.style.display = "none";
    a.style.opacity = "0";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    }
}

function serviceFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    var d = document.getElementById("b2b");
    if (b.style.display === "" || b.style.display === "none") {
    a.style.display = "none";
    b.style.display = "block";
    b.style.animation = "fade 1s linear forwards";
    c.style.display = "none";
    d.style.display = "none";
    } else {
    a.style.display = "none";
    b.style.display = "none";
    b.style.opacity = "0";
    c.style.display = "none";
    d.style.display = "none";
    }
}

function telecomFunction() {
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    var d = document.getElementById("b2b");
    if (c.style.display === "" || c.style.display === "none") {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "block";
    c.style.animation = "fade 1s linear forwards";
    d.style.display = "none";
    } else {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    c.style.opacity = "0";
    d.style.display = "none";
    }
}

function b2bFunction() {
    var w = document.getElementById("b2b");
    var x = document.getElementById("SPV_menu");
    var y = document.getElementById("service_menu");
    var z = document.getElementById("telecom_menu");
    var a = document.getElementById("SPV");
    var b = document.getElementById("service");
    var c = document.getElementById("telecom");
    var d = document.getElementById("b2b");
    if (d.style.display === "" || d.style.display === "none") {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "block";
    d.style.animation = "fade 1s linear forwards";
    } else {
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    d.style.opacity = "0";
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
    var x = document.getElementById("closeNav");
    var y = document.getElementById("sidebar");
    var z = document.getElementById("openNav");

    if(y.style.display === 'none'){
        y.style.display = "flex";
        setTimeout(() => {
            y.style.height = "100%";
        }, 10);
        z.style.display = "none";
        x.style.display = "inline-block";
    } else{
        setTimeout(() => {
            y.style.height = "0";
            y.style.display = "none";
            x.style.display = "none";
            z.style.display = "inline-block";
        }, 50);
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    const tests = document.querySelectorAll('.test');

    tests.forEach(test => {
        test.addEventListener('mouseover', () => {
            tests.forEach(el => {
                if (el !== test) {
                    el.classList.add('dim');
                }
            });
            test.classList.add('hover');
        });

        test.addEventListener('mouseout', () => {
            tests.forEach(el => {
                el.classList.remove('dim');
                el.classList.remove('hover');
            });
        });
    });
});
