let blocUn = document.createElement('div');
blocUn.classList.toggle('case');

let image = document.createElement('img');
image.src = "assets/img/bibito.png";
image.alt = "eeee";

let blocDeux = document.createElement('div');

let h4 = document.createElement('h4');
h4.innerHTML = "Nom du produit";

let blocTrois = document.createElement('div');
blocTrois.classList.toggle("info");

let textPrix = document.createElement('p');
textPrix.innerHTML = "prix €";

let qunt = document.createElement('input');
qunt.type = "number";
qunt.id = "quantity";
qunt.name = "quantity";
qunt.min = "1";
qunt.max = "9";

let trash = document.createElement('img');
trash.src = "assets/img/trash-solid.svg";

let textPrixTot = document.createElement('p');
textPrixTot.innerHTML = "14.99€";

blocTrois.appendChild(textPrix);
blocTrois.appendChild(qunt);
blocTrois.appendChild(trash);

blocDeux.appendChild(h4);
blocDeux.appendChild(blocTrois);

blocUn.appendChild(image);
blocUn.appendChild(blocDeux);

var test = document.querySelector('.listCart');

test.addEventListener('click', function(){
    test.appendChild(blocUn);
});

