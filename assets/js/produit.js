var appelProduit = new XMLHttpRequest();
var produitPlace = document.querySelector('.produits');
var test = document.querySelectorAll('.panier');
var essai = {};

if (localStorage.getItem('panier') === null) {
    var panier = {};
} else {
    panier = JSON.parse(localStorage.getItem('panier'));
}

document.querySelector('.nmbItems').innerHTML = ((Object.keys(panier).length === 0) ? ' ' : Object.keys(panier).length);

function createProducts(typeOfProducts) {
    appelProduit.open('GET', 'assets/json/produits.json');
    appelProduit.onload = function () {
        let data = JSON.parse(appelProduit.responseText);
        essai = {};
        for (let i = 1; i <= Object.keys(data).length; i++) {

            if (typeOfProducts == 'all') {
                essai[i] = data[i];
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
                test = document.querySelectorAll('.panier');

            } else if (data[i].type == typeOfProducts) {
                essai[i] = data[i];
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

                test = document.querySelectorAll('.panier');
            }
            test.forEach((item, index) => {
                test[index].addEventListener('click', function (e) {
                    let nmbOfcle = Object.keys(essai);
                    panier[index + 1] = essai[nmbOfcle[index]];
                    localStorage.setItem('panier', JSON.stringify(panier));
                    document.querySelector('.nmbItems').innerHTML = ((Object.keys(panier).length === 0) ? ' ' : Object.keys(panier).length);
                })
            });
        }

    }

    appelProduit.send();

}

document.querySelector('.choice').addEventListener('change', function (e) {
    produitPlace.innerHTML = '';
    createProducts(e.target.value);
})

createProducts('all');