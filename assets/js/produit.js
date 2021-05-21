var appelProduit = new XMLHttpRequest();
var produitPlace = document.querySelector('.produits');
var test = document.querySelectorAll('.panier');

if (localStorage.getItem('panier') === null) {
    var panier = {};
    console.log('set panier')
}
else{
    panier = JSON.parse(localStorage.getItem('panier'));
}

appelProduit.open('GET', 'assets/json/produits.json');
appelProduit.onload = function () {
    let data = JSON.parse(appelProduit.responseText);
    for (let i = 1; i < Object.keys(data).length; i++) {

        let global = document.createElement('div');
        global.classList.toggle('produit-carte');

        let prod = document.createElement('div');
        prod.classList.toggle('produit-img');
        let img = document.createElement('img');
        img.src = data[i].source_img;

        let info = document.createElement('div');
        info.classList.toggle('produit-info');
        let name = document.createElement('h5');
        name.innerHTML = data[i].nom;
        let price = document.createElement('h6');
        price.innerHTML = data[i].prix + '€';
        let panier = document.createElement('input');
        panier.classList.toggle('panier');
        panier.type = "submit";
        panier.value = "Ajouter au panier";
        panier.name = "Submit";

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(panier);

        prod.appendChild(img);
        global.appendChild(prod);
        global.appendChild(info);

        produitPlace.appendChild(global);
        console.log("fait");
        test = document.querySelectorAll('.panier');
        console.log(test);
    }

    test.forEach((item, index) => {
        test[index].addEventListener('click', function (e) {
            panier[index + 1] = data[index + 1];
            console.log(panier);
            localStorage.setItem('panier', JSON.stringify(panier));
            document.querySelector('.nmbItems').innerHTML = ((Object.keys(panier).length === 0)  ? ' ' : Object.keys(panier).length);
        })
    });
}
appelProduit.send();


