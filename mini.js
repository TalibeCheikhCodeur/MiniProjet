const URL1 = "http://127.0.0.1:8000/api/";
const numExpediteur = document.querySelector('#expediteur');
console.log(numExpediteur);
const nomExpediteur = document.querySelector('#expediteur_nom');
const montant = document.querySelector('#montant');
const fournisseur = document.querySelector('#fournisseur');
const type_trans = document.querySelector('#type_transaction');
const numDestinataire = document.querySelector('#destinataire');
const nomDestinataire = document.querySelector('#destinataire_nom');
const bouttonValide = document.querySelector('#btnValider');
const icone = document.querySelector('.icone');
const transactionTitle = document.querySelector('#transaction-title');
const desTitle = document.querySelector('.des');
const destinataire = document.querySelector('.destinataire');
const tbody = document.querySelector('tbody');
const tableConte = document.querySelector('.table-conte');
// console.log(nomExpediteur);
// console.log(montant);
// console.log('bap bap');
var transact;
(function (transact) {
    transact["om"] = "#ff4500";
    transact["wv"] = "#0088ff";
    transact["wr"] = "#008044";
    transact["cb"] = "#deb887";
})(transact || (transact = {}));
async function getData(url) {
    const data = await fetch(url);
    const d = await data.json();
    return d;
}
let tab = [];
bouttonValide.addEventListener("click", () => {
    let exp = document.querySelector("#expediteur");
    let expediteur = exp?.value;
    let montants = document.querySelector("#montant");
    let montant = montants?.value;
    let types = document.querySelector("#type_transaction");
    let type = types?.value;
    let des = document.querySelector("#destinataire");
    let destinataire = des?.value;
    let four = document.querySelector("#fournisseur");
    let fournisseur = four?.value;
    tab.push(destinataire, expediteur, type, montant, fournisseur);
    console.log(tab);
    const newTab = tab.reduce((acc, valeur, index) => {
        const cle = ["destinataire", "expediteur", "type", "montant", "fournisseur"][index];
        acc[cle] = valeur;
        return acc;
    }, {});
    fetch(URL1 + "/depot", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newTab)
    });
});
function creatingElement(elName, attributs, elementContent) {
    const element = document.createElement(elName);
    for (const cle in attributs) {
        element.setAttribute(cle, attributs[cle]);
    }
    element.textContent = elementContent;
    return element;
}
function afficheMessage(message, container) {
    const mess = creatingElement('div', { class: 'mess dflex jcc aic' }, message);
    container.append(mess);
    setTimeout(() => {
        container.removeChild(mess);
    }, 5000);
}
nomExpediteur.addEventListener("focus", () => {
    let expediteur = numExpediteur?.value;
    // console.log(expediteur);
    if (nomExpediteur.value !== " ") {
        icone.style.display = "block";
    }
    else {
        icone.style.display = "none";
    }
    let data = getData(URL1 + "nom/" + expediteur);
    data.then(res => {
        //    console.log(res);
        nomExpediteur.value = res;
    }).catch(error => {
        afficheMessage("Client", nomExpediteur);
    });
});
fournisseur.addEventListener("change", () => {
    transactionTitle.style.color = "white";
    desTitle.style.color = "white";
    if (fournisseur.value == "om") {
        transactionTitle.style.backgroundColor = transact.om;
        desTitle.style.backgroundColor = transact.om;
    }
    if (fournisseur.value == "wv") {
        transactionTitle.style.backgroundColor = transact.wv;
        desTitle.style.backgroundColor = transact.wv;
    }
    if (fournisseur.value == "wr") {
        transactionTitle.style.backgroundColor = transact.wr;
        desTitle.style.backgroundColor = transact.wr;
    }
    if (fournisseur.value == "cb") {
        transactionTitle.style.backgroundColor = transact.cb;
        desTitle.style.backgroundColor = transact.cb;
    }
});
type_trans.addEventListener("change", () => {
    if (type_trans.value == "retrait") {
        destinataire.style.display = "none";
    }
    else {
        destinataire.style.display = "block";
    }
});
icone.style.display = 'none';
function chargerData(tabs) {
    tbody.innerHTML = "";
    tabs.forEach(tab => {
        let tr = creatingElement('tr', { class: '' }, "");
        let date = creatingElement('td', { class: '' }, tab.date);
        let type = creatingElement('td', { class: '' }, tab.type);
        let montant = creatingElement('td', { class: '' }, tab.montant);
        tr.append(date, type, montant);
        tbody.append(tr);
    });
}
icone.addEventListener("click", () => {
    let expediteur = numExpediteur?.value;
    let data = getData(URL1 + "trans/" + expediteur);
    data.then(res => {
        tableConte.style.display = "block";
        chargerData(res);
    });
});
