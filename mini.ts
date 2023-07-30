const URL1: string = "http://127.0.0.1:8000/api/"

const numExpediteur = document.querySelector('#expediteur') as HTMLInputElement;
console.log(numExpediteur);
const nomExpediteur = document.querySelector('#expediteur_nom') as HTMLInputElement;
const montant = document.querySelector('#montant') as HTMLInputElement;
const fournisseur = document.querySelector('#fournisseur') as HTMLSelectElement
const type_trans = document.querySelector('#type_transaction') as HTMLSelectElement
const numDestinataire = document.querySelector('#destinataire') as HTMLInputElement;
const nomDestinataire = document.querySelector('#destinataire_nom') as HTMLInputElement;
const bouttonValide = document.querySelector('#btnValider') as HTMLButtonElement
const icone = document.querySelector('.icone') as HTMLElement
const transactionTitle = document.querySelector('#transaction-title') as HTMLElement
const desTitle = document.querySelector('.des') as HTMLElement
const destinataire = document.querySelector('.destinataire') as HTMLElement
const tbody = document.querySelector('tbody') as HTMLElement
const tableConte= document.querySelector('.table-conte') as HTMLElement
// console.log(nomExpediteur);
// console.log(montant);
// console.log('bap bap');

enum transact {
    om = "#ff4500",
    wv = "#0088ff",
    wr = "#008044",
    cb = "#deb887"
}


async function getData(url: string) {
    const data = await fetch(url);
    const d = await data.json();
    return d;
}
let tab: string[] = [];
bouttonValide.addEventListener("click", () => {
    let exp = document.querySelector("#expediteur") as HTMLInputElement
    let expediteur: string = exp?.value
    let montants = document.querySelector("#montant") as HTMLInputElement
    let montant: string = montants?.value
    let types = document.querySelector("#type_transaction") as HTMLSelectElement
    let type: string = types?.value
    let des = document.querySelector("#destinataire") as HTMLInputElement
    let destinataire: string = des?.value
    let four = document.querySelector("#fournisseur") as HTMLInputElement
    let fournisseur: string = four?.value
    tab.push(destinataire, expediteur, type, montant, fournisseur)
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
    })

})

function creatingElement(elName: string, attributs: any, elementContent: any) {
    const element = document.createElement(elName);
    for (const cle in attributs) {
        element.setAttribute(cle, attributs[cle])
    }
    element.textContent = elementContent;
    return element;
}

function afficheMessage(message: string, container: HTMLElement) {
    const mess = creatingElement('div', { class: 'mess dflex jcc aic' }, message);
    container.append(mess);
    setTimeout(() => {
        container.removeChild(mess);

    }, 5000)
}


nomExpediteur.addEventListener("focus", () => {
    let expediteur: string = numExpediteur?.value
    // console.log(expediteur);
    
    if (nomExpediteur.value !== " ") {
        icone.style.display = "block"
    } else {
        icone.style.display = "none"
    }
    let data = getData(URL1 + "nom/" + expediteur)
    data.then(res => {
    //    console.log(res);
       
        nomExpediteur.value = res
    }).catch(error => {
        afficheMessage("Client", nomExpediteur)
    })
})

fournisseur.addEventListener("change", () => {
    transactionTitle.style.color = "white"
    desTitle.style.color = "white"
    if (fournisseur.value == "om") {
        transactionTitle.style.backgroundColor = transact.om
        desTitle.style.backgroundColor = transact.om
    }
    if (fournisseur.value == "wv") {
        transactionTitle.style.backgroundColor = transact.wv
        desTitle.style.backgroundColor = transact.wv
    }
    if (fournisseur.value == "wr") {
        transactionTitle.style.backgroundColor = transact.wr
        desTitle.style.backgroundColor = transact.wr
    }
    if (fournisseur.value == "cb") {
        transactionTitle.style.backgroundColor = transact.cb
        desTitle.style.backgroundColor = transact.cb
    }
})

type_trans.addEventListener("change", () => {
    if (type_trans.value == "retrait") {
        destinataire.style.display = "none"
    } else {
        destinataire.style.display = "block"
    }
})

icone.style.display='none'
function chargerData(tabs: any) {
    tbody.innerHTML = ""
    tabs.forEach(tab => {
        let tr = creatingElement('tr', { class: '' }, "")
        let date = creatingElement('td', { class: '' }, tab.date)
        let type = creatingElement('td', { class: '' }, tab.type)
        let montant = creatingElement('td', { class: '' }, tab.montant)
        tr.append(date, type, montant)
        tbody.append(tr)
    });
}

icone.addEventListener("click", () => {
    let expediteur: string = numExpediteur?.value
    let data = getData(URL1 + "trans/" + expediteur)
    data.then(res => {
        tableConte.style.display = "block"
        chargerData(res)
    })
})
