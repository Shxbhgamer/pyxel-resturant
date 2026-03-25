// ================= CART STORAGE =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let saved = [];

// ================= SAVE =================
function save(){
localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= ADD =================
function addToCart(name, price){
let item = cart.find(i => i.name === name);

if(item){
item.qty++;
}else{
cart.push({name, price, qty:1});
}

save();
update();
}

// ================= INCREASE =================
function increaseQty(name){
let item = cart.find(i => i.name === name);
if(item){
item.qty++;
}
save();
update();
}

// ================= DECREASE =================
function decreaseQty(name){
let item = cart.find(i => i.name === name);

if(item){
if(item.qty > 1){
item.qty--;
}else{
cart = cart.filter(i => i.name !== name);
}
}

save();
update();
}

// ================= REMOVE =================
function removeItem(name){
cart = cart.filter(i => i.name !== name);
save();
update();
}

// ================= SAVE FOR LATER =================
function saveForLater(name){
let item = cart.find(i => i.name === name);

if(item){
saved.push(item);
cart = cart.filter(i => i.name !== name);
}

save();
update();
alert("Saved for later");
}

// ================= UPDATE CART UI =================
function update(){
let list = document.getElementById("cart-items");
let total = 0;

if(!list) return;

list.innerHTML = "";

cart.forEach(item=>{
total += item.price * item.qty;

let li = document.createElement("li");

li.innerHTML = `
<div class="cart-item">
<strong>${item.name}</strong><br>
₹${item.price} × ${item.qty}<br>

<button onclick="increaseQty('${item.name}')">+</button>
<button onclick="decreaseQty('${item.name}')">−</button>
<button onclick="removeItem('${item.name}')">❌</button>
<button onclick="saveForLater('${item.name}')">💾</button>
</div>
`;

list.appendChild(li);
});

// SAFE TOTAL UPDATE
let totalBox = document.getElementById("total");
if(totalBox){
totalBox.innerText = total;
}
}

// ================= WHATSAPP =================
function orderWhatsApp(){
let msg = "Order:%0A";

cart.forEach(i=>{
msg += `${i.name} x ${i.qty}%0A`;
});

window.open("https://wa.me/?text=" + msg);
}

// ================= LOAD =================
window.onload = update;

// ================= SMOOTH PAGE TRANSITION =================
document.querySelectorAll("a").forEach(link=>{
link.addEventListener("click",()=>{
document.body.style.opacity="0.7";
setTimeout(()=>{
document.body.style.opacity="1";
},200);
});
});

function placeOrder(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let address = document.getElementById("address").value;

let payment = document.querySelector('input[name="payment"]:checked').value;

if(!name || !phone || !address){
alert("Please fill all details");
return;
}

// BUILD ORDER MESSAGE
let msg = "🛒 *New Order* %0A%0A";

msg += "👤 Name: " + name + "%0A";
msg += "📞 Phone: " + phone + "%0A";
msg += "📍 Address: " + address + "%0A";
msg += "💳 Payment: " + payment + "%0A%0A";

msg += "📦 Order Details:%0A";

cart.forEach(item=>{
msg += `- ${item.name} x ${item.qty} (₹${item.price})%0A`;
});

// 👉 YOUR WHATSAPP NUMBER HERE
let number = "919431331072";

window.open(`https://wa.me/${number}?text=${msg}`);
}

function togglePayment(){
let payment = document.querySelector('input[name="payment"]:checked').value;
let upiBox = document.getElementById("upi-section");

if(payment === "UPI"){
upiBox.style.display = "block";
}else{
upiBox.style.display = "none";
}
}