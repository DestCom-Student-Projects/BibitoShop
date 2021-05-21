var cart = JSON.parse(localStorage.getItem('panier'));

/* var panier = {
    "2": {
        "nom": "tkt",
        "prix": '14.99€',
        "imageSrc": "eeeee",
        "quantity": '3'
    },
    "7": {
        "nom": "eeee",
        "prix": '17.99€',
        "imageSrc": "eeeee",
        "quantity": '2'
    },
    "5": {
        "nom": "eeee",
        "prix": '17.99€',
        "imageSrc": "eeeee",
        "quantity": '2'
    },
    "9": {
        "nom": "eeee",
        "prix": '17.99€',
        "imageSrc": "eeeee",
        "quantity": '2'
    },
    "15": {
        "nom": "eeee",
        "prix": '17.99€',
        "imageSrc": "eeeee",
        "quantity": '2'
    }
}*/

var test = document.querySelector('.listCart');
var boutonAchat = document.querySelector('.buttonAchat');

console.log(cart);

Object.keys(cart).forEach(key => {
    let blocUn = document.createElement('div');
    blocUn.classList.toggle('case');

    let image = document.createElement('img');
    image.src = cart[key].source_img;
    image.alt = cart[key].nom;

    let blocDeux = document.createElement('div');

    let h4 = document.createElement('h4');
    h4.innerHTML = cart[key].nom;

    let blocTrois = document.createElement('div');
    blocTrois.classList.toggle("info");

    let textPrix = document.createElement('p');
    textPrix.innerHTML = cart[key].prix + '€';

    let qunt = document.createElement('input');
    qunt.type = "number";
    let ayedi = "quantity" + key;
    qunt.classList.toggle("quantity");
    qunt.id = ayedi;
    qunt.name = ayedi;
    qunt.min = "1";
    qunt.max = "9";
    qunt.value = 1;

    let trash = document.createElement('img');
    trash.src = "assets/img/trash-solid.svg";
    trash.classList.toggle('poubelle');
    trash.classList.toggle(key);


    let textPrixTot = document.createElement('p');
    textPrixTot.classList.toggle('prixTotal');
    textPrixTot.innerHTML = cart[key].prix + '€';

    blocTrois.appendChild(textPrix);
    blocTrois.appendChild(qunt);
    blocTrois.appendChild(trash);

    blocDeux.appendChild(h4);
    blocDeux.appendChild(blocTrois);

    blocUn.appendChild(image);
    blocUn.appendChild(blocDeux);
    blocUn.appendChild(textPrixTot);
    test.appendChild(blocUn);
});

document.querySelector('.nmbItems').innerHTML = ((Object.keys(cart).length === 0)  ? ' ' : Object.keys(cart).length);
var produitBloc = document.querySelectorAll('.case');
var numPoubelle = document.querySelectorAll('.poubelle');
var qtt = document.querySelectorAll('.quantity');
var nmbTot = document.querySelectorAll('.prixTotal');

numPoubelle.forEach((bloc, numCase) => {
    numPoubelle[numCase].addEventListener('click', function (e) {
        let cle = Object.keys(cart);
        console.log(cart);
        produitBloc[numCase].remove();
        console.log(produitBloc[numCase]);
        console.log(cart[numCase + 1]);
        console.log('delete', cle[numCase]);
        delete cart[cle[numCase]];
        localStorage.setItem('panier', JSON.stringify(cart));
        document.querySelector('.nmbItems').innerHTML = ((Object.keys(cart).length === 0)  ? ' ' : Object.keys(cart).length);
        if (document.querySelectorAll('.case').length === 0) {
            test.innerHTML = "Vous n'avez aucun produit dans votre panier !";
            boutonAchat.classList.toggle('hidden');
        }
    });
});

if (document.querySelectorAll('.case').length === 0) {
    test.innerHTML = "Vous n'avez aucun produit dans votre panier !";
    boutonAchat.classList.toggle('hidden');
}

qtt.forEach((item, index) => {
    let cle = Object.keys(cart);
    qtt[index].addEventListener('change', function(e){
        nmbTot[index].innerHTML = (Math.round((cart[cle[index]].prix * e.target.value)*100)/100) + '€';
        cart[cle[index]].prixTotal = (Math.round((cart[cle[index]].prix * e.target.value)*100)/100) + '€';
    })
})