var appelProduit = new XMLHttpRequest();
var produitPlace = document.querySelector('.produits');


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
        price.innerHTML = data[i].prix;
        let panier = document.createElement('input');
        panier.classList.toggle('panier');
        panier.type = "submit";
        panier.value = "ajout";
        panier.name = "Submit";

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(panier);

        prod.appendChild(img);

        global.appendChild(info);
        global.appendChild(prod);
        produitPlace.appendChild(global);
        console.log("fait");
    }
}
appelProduit.send();