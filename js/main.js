
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = 'create';
let globalParam;

// function get total price
function getTotal() {
    // no ooooooo  rice show in total after set value in box of price value
    if(price.value != ''){
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.innerHTML = result;
        total.style.backgroundColor = '#228B22';
        total.style.transition = '1s'
        total.style.width = "150px"
    } else {
        total.style.backgroundColor = '#a00d02';
        total.style.transition = '1s'
        total.innerHTML = 0;
        total.style.width = "100px"
    }
}
let dataProduct;
// func create product
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}


submit.addEventListener('click', ()=> {
    let allProdInOne = {
        title: title.value,
        price: price.value,
        taxes:taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if(title.value != '' && price.value != '' &&  category.value != '' && count.value <= 100){
        if (mood === 'create'){
            if(allProdInOne.count > 1){
                for (let i = 0; i < allProdInOne.count; i++) {
                    // create product line
                    dataProduct.push(allProdInOne)
                }
            }else {
                dataProduct.push(allProdInOne)
            }
        } else {
            dataProduct[globalParam] = allProdInOne;
            mood = 'create';
            submit.innerHTML = 'Create'
            count.style.display = 'block'
    }
    clearDataInputs();
    }
        
    
    
    localStorage.setItem('product',  JSON.stringify(dataProduct))
    showData();
})

// after create product clear inputs
function clearDataInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read data in table
function showData() {
    getTotal();
    let table = ''
    for(let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr class="test-tr">
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onClick="updateProd(${i})" id="update">Update</button></td>
                <td><button onClick="deleteProd(${i})" id="delete">Delete</button></td>
            </tr>`
    }
    document.getElementById('list').innerHTML = table

    //  count >> repeat products 
    let conta = document.getElementById("deleteAll")
    if(dataProduct.length > 0){
        conta.innerHTML = `
        <button onclick="deleteAllProducts()">Delete All(${dataProduct.length})</button>
        `
    }else{
        conta.innerHTML = ''
    }
}
showData();

// delet product
function deleteProd(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// create delete all button
function deleteAllProducts() {
    localStorage.clear()
    dataProduct.splice(0)
    showData();
}



// update product
function updateProd(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = 'none';
    scroll({
        top:0,
        behavior:'smooth'
    })
    submit.innerHTML = 'Update';
    mood = 'update'
    globalParam = i;
    console.log(i);
    
}

// search product
let inpSearch = document.getElementById("search");
let btnSearchTit = document.getElementById("seachTitle")
let btnSearchCate = document.getElementById("seachCategory")
let moodSearch = 'title'
function searchProd(id){
    if(id === 'seachTitle'){
        moodSearch = 'title'
    }else{
        moodSearch = 'category'
    }
    inpSearch.placeholder = `Search By ${moodSearch}`
    inpSearch.focus();

    // to clear input when clicked btn search
    inpSearch.value = '';
    // called it after clear inputs show data again not filter data
    showData();
}

function searchInp(value){
    
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        if (moodSearch == 'title'){
            if(dataProduct[i].title.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onClick="updateProd(${i})" id="update">Update</button></td>
                        <td><button onClick="deleteProd(${i})" id="delete">Delete</button></td>
                    </tr>`
            }
    
        }else{
            if(dataProduct[i].category.toLowerCase().includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onClick="updateProd(${i})" id="update">Update</button></td>
                        <td><button onClick="deleteProd(${i})" id="delete">Delete</button></td>
                    </tr>`
            }
        }
    }
    
    document.getElementById('list').innerHTML = table
}



// clean data

