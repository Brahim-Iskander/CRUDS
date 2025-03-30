let title = document.getElementById('title');
let price = document.getElementById('price');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let category = document.getElementById('category');
let mood = 'create'
let tmp;
//calculate total
function calculateTotal() {
    if(price.value !='') {
        total.style.backgroundColor = 'green';
        total.innerHTML = (+price.value + +tax.value + +ads.value) - +discount.value;
    }
    else {

        total.style.backgroundColor = 'red';
        total.innerHTML = '';
    }
}

//creat local storage
let dataPro;
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product) }
else {
    dataPro = [];
}

submit.onclick = function() {
    let dataa = {
        title: title.value.toLowerCase(),
        price: price.value,
        count: count.value,
        total: total.innerHTML,
        discount: discount.value,
        tax: tax.value,
        count: count.value,
        category: category.value.toLowerCase(),
        ads: ads.value
    };
    if(dataa.title!="" && dataa.price!="" && dataa.count < 100 && dataa.category !="" ){
    if(mood == 'create') {
        if(dataa.count>1){
            for(let i=0; i<dataa.count; i++){
                dataPro.push(dataa);
            }
        }
        else{
            dataPro.push(dataa);
            }
        }
    else{
        dataPro[tmp] = dataa;
        mood='create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData();
}
    localStorage.setItem('product', JSON.stringify(dataPro));
    
    showData();
}
//clear data input
function clearData() {
    title.value = '';
    price.value = '';
    total.innerHTML = '';
    discount.value = '';
    tax.value = '';
    ads.value = '';
    count.value = '';
    category.value = '';
}
function showData() {
    calculateTotal();
    table="";
    for(let i=0; i<dataPro.length; i++) {
        table += 
        `<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].tax}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updatedata(${i})"  id="update">update</button></td>
            <td><button onclick="deletData(${i})" id="delet">delet</button></td>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    
    let btndeletAll = document.getElementById('deletall');
    if(dataPro.length > 0) {
        btndeletAll.innerHTML = `
        <button  onclick="deletalll()">deletALL(${dataPro.length})</button> `
    }
    else{
         btndeletAll.innerHTML = ``
    }
}
showData()


//delete data
function deletData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

//delet all

function deletalll() {

    localStorage.clear();
    dataPro.splice(0);
    showData();
}


function updatedata(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    discount.value = dataPro[i].discount;
    tax.value = dataPro[i].tax;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    ads.value = dataPro[i].ads;
    calculateTotal();
    submit.innerHTML = 'Update';
    count.style.display = 'none';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })


}
searchModee="title"
function searchMode(value) {
    let ser= document.getElementById('search');
    if(value === "searchbytitle") {
        ser.placeholder = "Search By Title";
        searchModee="title"
    }
    else{
        ser.placeholder = "Search By Category";
        searchModee="category"
    }
    ser.focus();
    ser.value = '';
    showData()
}

function searcher(value) {
    let table="";
    if (searchModee == "title") {
        for(let i=0; i<dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatedata(${i})"  id="update">update</button></td>
                    <td><button onclick="deletData(${i})" id="delet">delet</button></td>
                `
            }
            
        }
    }
    else{
        for(let i=0; i<dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatedata(${i})"  id="update">update</button></td>
                    <td><button onclick="deletData(${i})" id="delet">delet</button></td>
                `
            }
            
        }


    }
    document.getElementById('tbody').innerHTML = table;
}
function imprante() {
    let x = document.getElementById('search');
    let y = document.getElementById('searchbytitle');
    let z = document.getElementById('searchbycategory');

    title.style.display = 'none';
    price.style.display = 'none';
    total.style.display = 'none';
    discount.style.display = 'none';
    tax.style.display = 'none';
    ads.style.display = 'none';
    count.style.display = 'none';
    category.style.display = 'none';
    submit.style.display = 'none';
    x.style.display = 'none';
    y.style.display = 'none';
    z.style.display = 'none';
    document.getElementById('deletall').style.display = 'none';
    document.getElementById('oblig').style.display = 'none';
    window.print()
}
