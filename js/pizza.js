// Read Json Data//--------------------------------------------------------------------------------
var mydata;
function loadData() {
    fetch("json/food-items.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsObject) {
            valueCallBack(jsObject);
        });
}

function valueCallBack(jsObject) {
    mydata = jsObject;
    createItems();
}
//-----------------------------------------------------------------------------------------------
// Craete Item//---------------------------------------------------------------------------------
function createItems() {
    var itemBox = document.getElementById("item-box");
    itemBox.innerHTML = "";
    itemBox.style.overflow = "hidden";
    for (let i = 0; i < mydata.items.length; i++) {
        var food = mydata.items[i];
        var div = document.createElement("div");
        div.classList.add("img-box");
        div.style.overflow = "hidden";
        for (let j = 0; j < food.qty; j++) {
            var img = document.createElement("img");
            img.classList.add("img-item");
            img.setAttribute("src", food.image);
            img.setAttribute("draggable", "true");
            img.setAttribute("id", food.id + "_" + j);
            img.setAttribute("data-id", food.id);
            img.setAttribute("data-name", food.name);
            img.setAttribute("data-price", food.price);
            img.setAttribute("data-calorie", food.calorie);
            img.setAttribute("ondragstart", "drag(event)");
            div.appendChild(img);
        }
        itemBox.appendChild(div);

    }

}
//-------------------------------------------------------------------------------------
function drag(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}
//-------------------------------------------------------------------------------------------------
// Drop Item//--------------------------------------------------------------------------------------
function onDrop(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("id");
    var item = document.getElementById(id);
    var pizza = document.getElementById("pizza-dough");
    var newItem = document.createElement("img");
    newItem.setAttribute("src", item.src);
    newItem.setAttribute("data-id", item.dataset.id);
    newItem.setAttribute("data-name", item.dataset.name);
    newItem.setAttribute("data-price", item.dataset.price);
    newItem.setAttribute("data-calorie", item.dataset.calorie);
    newItem.classList.add("pizza-item");
    newItem.style.position = "absolute";
    newItem.style.width = "60px";
    newItem.style.height = "60px";
    newItem.style.objectFit = "contain";
    var pizzaRect = pizza.getBoundingClientRect();
    var x = event.clientX - pizzaRect.left;
    var y = event.clientY - pizzaRect.top;
    newItem.style.left = (x - 30) + "px";
    newItem.style.top = (y - 30) + "px";
    pizza.appendChild(newItem);
    item.remove();
    updatePrice();
    updateCalorie();

}
//-----------------------------------------------------------------------------------------
// Update price //-------------------------------------------------------------------------
function updatePrice() {
    var pizza = document.getElementById("pizza-dough");
    var items = pizza.getElementsByClassName("pizza-item");
    var total = 0;
    for (let i = 0; i < items.length; i++) {
        total += Number(items[i].dataset.price);
    }
    document.getElementById("total-price").innerText = total;
}
//-------------------------------------------------------------------------------------------
// Update calorie //--------------------------------------------------------------------------
function updateCalorie() {
    var pizza = document.getElementById("pizza-dough");
    var items = pizza.getElementsByClassName("pizza-item");
    var total = 0;
    for (let i = 0; i < items.length; i++) {
        total += Number(items[i].dataset.calorie);
    }
    document.getElementById("total-calorie").innerText = total;
}
//------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    loadData();
});



