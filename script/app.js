let cart = document.querySelector(".cart")
let slide = document.querySelector(".cart-side")
let closeCart = document.querySelector(".close-cart")
let card = document.querySelector(".products-container")
let cartProducts = document.querySelector(".cart-products")
let totalPrice = document.querySelector(".total-price")
let page = document.querySelector(".products-container")
let submit = document.querySelector(".submit")
let cartItems = [];
getFromStorage()
let cartTotal = 0;


// add products to page
let api = "api/products.json"
let response = new XMLHttpRequest()
response.open("GET" , api)
response.send()
response.onreadystatechange = function() {
    if(this.status===200 && this.readyState===4){
        let data = JSON.parse(this.response)
        for (let i = 0; i < data.length; i++) {
            if (data[i].name != ""){
            let card = document.createElement("div")
            card.className = "card"
            let cardImage = document.createElement("div")
            cardImage.className = "card-image"
            let img = document.createElement("img")
            img.className = "card-img"
            img.setAttribute("src" , `products/${data[i].src}`)
            let productName = document.createElement("div")
            productName.innerHTML = data[i].name
            productName.className = "product-name"
            let price = document.createElement("span")
            price.innerHTML = Number(data[i].price)
            price.classList = "price"
            let egp = document.createElement("span")
            egp.innerHTML = " EGP"
            let imgCart = document.createElement("img")
            imgCart.className = "add-cart"
            imgCart.setAttribute("src" , "icons/cart.png")
            cardImage.appendChild(img)
            card.appendChild(cardImage)
            card.appendChild(productName)
            card.appendChild(price)
            card.appendChild(egp)
            card.appendChild(imgCart)
            page.appendChild(card)
            }
        }
    }
}

// open close cart
cart.onclick = function() {
    slide.classList.add("active")
}
closeCart.onclick = function() {
    slide.classList.remove("active")
}
// delete cart item
slide.addEventListener("click" , function(e){
    if(e.target.classList.contains("delete-cart")){
        e.target.parentElement.remove()
        cartItems = cartItems.filter((item) => item.id != e.target.parentElement.getAttribute("id"))
        updateCart();
    }
})
// add item to cart
card.addEventListener("click" , function(e){
    let name = e.target.parentElement.querySelector(".product-name")
    let price = e.target.parentElement.querySelector(".price")
    let src = e.target.parentElement.querySelector(".card-img")
    e.target.classList.toggle("active")
    if(e.target.classList.contains("add-cart")){
        let cartCard = document.createElement("div")
        cartCard.className = "cart-card"
        cartCard.setAttribute("id" , Date.now())
        let cartCardImage = document.createElement("div")
        cartCardImage.className = "cart-card-image"
        let img = document.createElement("img")
        img.setAttribute("src" , src.getAttribute("src"))
        let cartProductName = document.createElement("div")
        cartProductName.innerHTML = name.innerHTML
        cartProductName.className = "cart-product-name"
        let cartPrice = document.createElement("span")
        cartPrice.innerHTML = Number(price.innerHTML)
        cartPrice.classList = "cart-price"
        let deleteCart = document.createElement("button")
        deleteCart.innerHTML = "Delete"
        deleteCart.className = "delete-cart"
        cartCardImage.appendChild(img)
        cartCard.appendChild(cartCardImage)
        cartCard.appendChild(cartProductName)
        cartCard.appendChild(cartPrice)
        cartCard.appendChild(deleteCart)
        cartProducts.appendChild(cartCard)
        // calc
        cartItems.push({ name: cartProductName.innerHTML, price: Number(cartPrice.innerHTML), id:cartCard.getAttribute("id"), src: img.getAttribute("src") });
        updateCart();
    }
})

// calc and local storage
function updateCart(){
    cartTotal = 0
    for (let i = 0; i < cartItems.length; i++) {
        let price = cartItems[i].price
        cartTotal += price
        totalPrice.textContent = `${Number(cartTotal)} EGP`
    }
    let storageData = JSON.stringify(cartItems)
    window.localStorage.setItem("products" , storageData)
    window.localStorage.setItem("products-price" , totalPrice.innerHTML)
    if(cartTotal === 0 ){
        localStorage.setItem("products-price", 0)
        totalPrice.textContent = 0+ " EGP"
    }
}

function getFromStorage(){
    if(localStorage.getItem("products-price")){
        totalPrice.textContent = localStorage.getItem("products-price") 
    }
    if (localStorage.getItem("products")){
        let storageData = JSON.parse(window.localStorage.getItem("products"))
        cartItems = storageData
        cartItems.forEach((item) => {
        let cartCard = document.createElement("div")
        cartCard.className = "cart-card"
        cartCard.setAttribute("id" , item.id)
        let cartCardImage = document.createElement("div")
        cartCardImage.className = "cart-card-image"
        let img = document.createElement("img")
        img.setAttribute("src" , item.src)
        let cartProductName = document.createElement("div")
        cartProductName.innerHTML = item.name
        cartProductName.className = "cart-product-name"
        let cartPrice = document.createElement("span")
        cartPrice.innerHTML = item.price
        cartPrice.classList = "cart-price"
        let deleteCart = document.createElement("button")
        deleteCart.innerHTML = "Delete"
        deleteCart.className = "delete-cart"
        cartCardImage.appendChild(img)
        cartCard.appendChild(cartCardImage)
        cartCard.appendChild(cartProductName)
        cartCard.appendChild(cartPrice)
        cartCard.appendChild(deleteCart)
        cartProducts.appendChild(cartCard)
        });
    }}


submit.onclick = function(){    
    let items = []
    for (let i = 0; i < cartItems.length; i++) {
            items.push(cartItems[i].name)
        }
    let finalItems = items.toString()
        window.location.href =`https://wa.me/+201557264979?text=Hallo%20E-commerce%20store%0AI%20want%20to%20order%20this:%0A${finalItems}%0AAnd%20it%20costs:${totalPrice.textContent}`
    console.log(totalPrice.textContent)
}