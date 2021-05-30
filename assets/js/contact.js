var demande = {
    'email': '',
    'message': '',
    'categorie': '',
    'tel': '',
    'name': ''
}

document.querySelector('#email').addEventListener('input', function (e) {
    demande["email"] = e.target.value;
    buttonDisabled();
});
document.querySelector('#message').addEventListener('input', function (e) {
    demande["message"] = e.target.value;
    buttonDisabled();
});
document.querySelector('#categorie').addEventListener('change', function (e) {
    demande["categorie"] = e.target.value;
    buttonDisabled();
});
document.querySelector('#tel').addEventListener('input', function (e) {
    demande["tel"] = e.target.value;
    buttonDisabled();
});
document.querySelector('#name').addEventListener('input', function (e) {
    demande["name"] = e.target.value;
    buttonDisabled();
});


function buttonDisabled() {
    if ((demande["email"] == '') || (demande["message"] == '') || (demande["categorie"] == '') || (demande["tel"] == '')|| (demande["name"] == '')) {
        document.querySelector('#envoi').disabled = true;
    } else {
        document.querySelector('#envoi').disabled = false;
    }
}

document.querySelector('#envoi').addEventListener('click', function(e){
    e.preventDefault();
    console.log(demande)
});