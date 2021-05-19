var request = new XMLHttpRequest();
var test = document.querySelector(".test");
var dedans= document.querySelector(".affichededansla");

test.addEventListener('click', function (e) {
    let nmb = null;
    request.open('GET', './assets/json/produits.json');
    request.onload = function () {
        var data = JSON.parse(request.responseText);
        nmb = JSON.parse(request.responseText)
        console.log(request.responseText);
        for(let i = 1; i<Object.keys(data).length; i++){
            let p = document.createElement('p');
            let temp =  data[i].nom;
            p.innerHTML = temp;
            dedans.appendChild(p);
            console.log('eeeee')
        }
    }
    request.send();
    
});