var itemsApi = 'http://localhost:3000/items';

var obj = {
    name: "Áo sơ mi",
    price: "200.000 VND"
}

function start(){
    getListItem(renderListItem);
}
//Get list item from db
function getListItem(callback){
    fetch(itemsApi)
        .then(function(response){
            return response.json();
        })
        // .then(function(items){
        //     renderListItem(items)
        // })
        .then(callback) 
}
//render data to code HTML from array items 
function renderListItem(items){
    var listItemsBlock = document.querySelector('#listItems');
    var textHTML = items.map(function(item){
        return `
                <li class = itemId${item.id}>
                    <h2>${item.name}</h2>
                    <p>${item.price}</p>
                    <button onclick = deleteItem(${item.id})>Xoá</button>
                    <button onclick = editItem(${item.id})>Sửa</button>
                </li>
                `    
    })
    listItemsBlock.innerHTML = textHTML.join('');
}
//Event click button "create"
function handleBtnCreate(){
    var btnCreate = document.querySelector('#create');
    btnCreate.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var item = {
            name: name,
            price: price
        }
        createItem(item,renderListItem);
    }
}
//Create item in database and render HTML
function createItem(item,callback){
    fetch(itemsApi,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(function(response){
        return response.json();
    })
    .then(callback)//render
}
//Delete item from file HTML and database
function deleteItem(id){
    document.querySelector('.itemId'+id).remove();

    fetch(itemsApi+'/'+id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
//event click button "Sửa"
function editItem(id){
    var name = document.querySelector('.itemId'+id+' h2').textContent;
    var price = document.querySelector('.itemId'+id+' p').textContent;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="price"]').value = price;
    var btnCreate = document.querySelector('#create');
    var btnUpdate = document.querySelector('#update');
    btnCreate.style.display = "none";
    btnUpdate.style.display = "inline-block";
    //event click button "Update"
    btnUpdate.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var item = {
            name: name,
            price: price
        }
        updateItem(id,item,renderListItem);
    }
}
//Update item in database and render HTML
function updateItem(id,item,callback){
    fetch(itemsApi+'/'+id,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: item.name,
                price: item.price
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(callback)//render
}

start();
handleBtnCreate();








