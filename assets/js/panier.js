if (localStorage.getItem('panier') === null) {
    var cart = null;
} else {
    var cart = JSON.parse(localStorage.getItem('panier'));
}
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

var utilisateurs = {
    'nom': '',
    'prenom': '',
    'mail': '',
    'numRue': '',
    'nomRue': '',
    'codePostal': '',
    'ville': '',
    'achat': {},
    'totalFinal': 0

}

var test = document.querySelector('.listCart');
var boutonAchat = document.querySelector('.buttonAchat');

if (cart != null) {
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

    document.querySelector('.nmbItems').innerHTML = ((Object.keys(cart).length === 0) ? ' ' : Object.keys(cart).length);
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
            document.querySelector('.nmbItems').innerHTML = ((Object.keys(cart).length === 0) ? ' ' : Object.keys(cart).length);
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
        qtt[index].addEventListener('change', function (e) {
            nmbTot[index].innerHTML = (Math.round((cart[cle[index]].prix * e.target.value) * 100) / 100) + '€';
            cart[cle[index]].prixTotal = (Math.round((cart[cle[index]].prix * e.target.value) * 100) / 100);
            cart[cle[index]].quantites = e.target.value;
        });
    })

    document.querySelector('.buttonAchat').addEventListener('click', function (e) {
        let total = 0;
        document.querySelector('.listCart').classList.toggle('hidden');
        document.querySelector('.buttonAchat').classList.toggle('hidden');
        document.querySelector('.affForm').classList.toggle('formulaire');
        document.querySelector('.affForm').classList.remove('hidden');

        Object.keys(cart).forEach(key => {
            let divUn = document.createElement('div');
            let pUn = document.createElement('p');
            let pDeux = document.createElement('p');
            let pTrois = document.createElement('p');

            pUn.innerHTML = cart[key].nom;
            pDeux.innerHTML = cart[key].quantites;
            pTrois.innerHTML = cart[key].prixTotal + '€';

            divUn.appendChild(pUn);
            divUn.appendChild(pDeux);
            divUn.appendChild(pTrois);



            document.querySelector('.recap').appendChild(divUn);
        });

        Object.keys(cart).forEach(key => {
            total = total + parseFloat(cart[key].prixTotal);
        });

        let pTotal = document.createElement('p');
        pTotal.innerHTML = 'Total : ' + (Math.round(total * 100) / 100) + '€';
        pTotal.classList.toggle('ptotalFinal');
        document.querySelector('.recap').appendChild(pTotal);

        let finAchat = document.createElement('input');
        finAchat.type = 'submit';
        finAchat.value = 'COMMANDER';
        finAchat.id = 'envoi';
        finAchat.disabled = true;
        finAchat.classList.toggle('buy');
        document.querySelector('#cart').appendChild(finAchat);

        utilisateurs['achat'] = cart;
        utilisateurs['totalFinal'] = Math.round(total * 100) / 100;

        document.querySelector('#envoi').addEventListener('click', function (e) {
            //e.preventDefault();
            console.log('nom', utilisateurs['nom']);
            console.log(utilisateurs);
            let reqEnvoi = new XMLHttpRequest();

            reqEnvoi.open('POST', 'http://localhost');
            reqEnvoi.setRequestHeader('Content-Type', 'application/json');
            let sendData = JSON.stringify(utilisateurs);
            console.log(sendData);
            reqEnvoi.send(sendData);

            localStorage.removeItem('panier');
            document.querySelector('.nmbItems').innerHTML = '';

            document.querySelector('.affForm').innerHTML = 'Commande effectuée !<br><br><br><br><br>';// +  sendData;

        });
    });

    document.querySelector('#nom').addEventListener('input', function (e) {
        utilisateurs["nom"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#prenom').addEventListener('input', function (e) {
        utilisateurs["prenom"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#mail').addEventListener('input', function (e) {
        utilisateurs["mail"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#num').addEventListener('input', function (e) {
        utilisateurs["numRue"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#rue').addEventListener('input', function (e) {
        utilisateurs["nomRue"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#cp').addEventListener('input', function (e) {
        utilisateurs["codePostal"] = e.target.value;
        buttonDisabled();
    });
    document.querySelector('#ville').addEventListener('input', function (e) {
        utilisateurs["ville"] = e.target.value;
        buttonDisabled();
    });

    function buttonDisabled() {
        if ((utilisateurs["nom"] == '') || (utilisateurs["prenom"] == '') || (utilisateurs["mail"] == '') || (utilisateurs["numRue"] == '') || (utilisateurs["nomRue"] == '') || (utilisateurs["codePostal"] == '') || (utilisateurs["ville"] == '')) {
            document.querySelector('#envoi').disabled = true;
        } else {
            document.querySelector('#envoi').disabled = false;
        }
    }

} else {
    test.innerHTML = "Vous n'avez aucun produit dans votre panier !";
    boutonAchat.classList.toggle('hidden');
}