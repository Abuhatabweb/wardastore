let p1 = document.querySelector(".homeproduct1")
let p2 = document.querySelector(".homeproduct2")
let p3 = document.querySelector(".homeproduct3")
let p4 = document.querySelector(".homeproduct4")
let explore = document.querySelector(".explore")


window.addEventListener("scroll" , function(){
    let value = window.scrollY
    p1.style.marginRight = -value * 2.5 + "px"
    p1.style.marginTop = -value * 2.5 + "px"

    p2.style.marginRight = -value * 1.5 + "px"
    p2.style.marginBottom = -value * 1.5 + "px"

    p3.style.marginLeft = -value * 1.5 + "px"
    p3.style.marginTop = -value * 1.5 + "px"

    p4.style.marginLeft = -value * 2.5 + "px"
    p4.style.marginBottom = -value * 2.5 + "px"

    explore.style.marginTop = value * 1.5 + "px"
})