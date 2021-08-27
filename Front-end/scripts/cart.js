
let productStorage = JSON.parse(localStorage.getItem("product"));
console.log(productStorage);

// AFFICHAGE PRODUIT DANS LE PANIER //
const displayCart = document.querySelector('#cart-container');

// Si panier vide => Afficher le panier vide
if(productStorage === null) {
  const emptyCart = `
  <div class="empty-cart col-6 mx-auto">
    <h2>Votre Panier est vide.</h2>
    <img src="img/Point-int.jpeg" alt="Point d'interrogation" class="card-img-top">
  </div>`
  displayCart.innerHTML = emptyCart;
} else {
  // Si le panier n'est pas vide => Afficher produit du local storage
  let structureCart = `
  <div class="row">
    <div class="col mx-auto">
      <h3>Vos articles:</h3>
      <table class="w-100">
        <thead>
          <tr class="bg-light border-2">
            <th>Produit</th>
            <th>Objectif</th>
            <th>Prix</th>
            <th>Supp.</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>`;

  for(k = 0; k < productStorage.length; k++) {

    structureCart += `
    <div class="row">
      <div class="col">
        <table class="w-100">
          <thead>
            <tr class="bg-light d-flex justify-content-around">
              <th class="product-item">${productStorage[k].nom}</th>
              <th class="objectif-item">${productStorage[k].Objectif}</th>
              <th class="price-item">${productStorage[k].prix}€</th>
              <th><button class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>`;
  }

  if(k === productStorage.length) {
    // injection html dans la page panier
    displayCart.innerHTML = structureCart;

  }
}
// Supprimer un article du panier //

let deleteItem = document.querySelectorAll(".fa-trash-alt");
console.log(deleteItem);

for(l = 0; l < deleteItem.length; l++) {
  deleteItem[l].addEventListener("click", (event) => {
    event.preventDefault();
    console.log(event);

    let idDelete = productStorage[l].idProduct;
   


//A COMPLETER

  })
}

// ********Vider totalement le panier**********//

//Injecter le bouton HTML 
const btnAllDeleteHtml = `
<button class="btn-delete btn-danger rounded">Vider le panier</button>`;

displayCart.insertAdjacentHTML("beforeend", btnAllDeleteHtml);

//On selectionne le bouton
const btnAllDelete = document.querySelector(".btn-delete");
console.log(btnAllDelete);

//Suppression de la key product du local Storage pour vider le panier
btnAllDelete.addEventListener('click', (e) => {
  e.preventDefault();

    //.removeItem pour vider le local storage
    localStorage.removeItem("product");
    // Alert "le panier à été vidé";
    alert("Le panier a bien été vidé !")
    //rechargement de la page
    window.location.href = "cart.html";

})

// ********On calcule le total du panier**********//

// Variable contenant les prix présents dans le panier

let totalPriceCalcul = [];

// On cherche les prix dans le panier

for(let m = 0; m < productStorage.length; m++) {
  let priceInCart = productStorage[m].prix;

  //Mettre les prix du panier dans le tableau total
  totalPriceCalcul.push(priceInCart)
  console.log(totalPriceCalcul);
}

// Additioner les prix du tableau avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer, 0 );
console.log(totalPrice);

//Le code Html du prix total à afficher 
const DisplayTotalPriceHtml = `
<div class="total-price bg-light"><strong>Total: ${totalPrice}€</strong></div>`;

// Injecter dans le html
displayCart.insertAdjacentHTML("afterend", DisplayTotalPriceHtml);

// ********Le Formulaire**********//

const displayFormHtml = () => {
  //Sélectionner élément DOM pour positionnnement formulaire
  const displayForm = document.querySelector('#form-container');
  console.log(displayForm);

  const structureFrom = `
        <div class="col-12"> 
          <h2>Passez commande</h2>
          <form class="bg-secondary">
            <div class="form-group col-12 text-center">
              <label for="firstname" class="label">Prénom:</label>
              <input type="text" name="firstname" id="firstname" class="inputForm" required>
            </div>
            <div class="form-group col-12 text-center">
              <label for="lastname" class="label">Nom:</label>
              <input type="text" name="lastname" id="lastname" class="inputForm" required>
            </div>
            <div class="form-group col-12 text-center">
              <label for="email" class="label">Adresse e-mail:</label>
              <input type="text" name="email" id="email" class="inputForm" required>
            </div>
            <div class="form-group col-12 text-center">
              <label for="adress" class="label">Adresse:</label>
              <input type="text" name="adress" id="adress" class="inputForm" required>
            </div>
            <div class="form-group col-12 text-center">
              <label for="zipcode" class="label">Code postal:</label>
              <input type="text" name="zipcode" id="zipcode" class="inputForm" required>
            </div>
            <div class="form-group col-12 text-center">
              <label for="city" class="label">Ville:</label>
              <input type="text" name="city" id="city" class="inputForm" required>
            </div>
            <button type="submit" id="btn-form" class="btn btn-dark">Envoyer la commande</button>
          </form>
        </div>`;
    
        //Injection HTML 
        displayForm.insertAdjacentHTML("afterend", structureFrom);
};
//Affichage du formulaire
displayFormHtml ();

//Selection du bouton "envoyer la commande"
const btnSendForm = document.querySelector("#btn-form");

//*******AddEventlisttener**************/

btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();

//Récupération valeur formulaire
const formValues = {
  firstname : document.querySelector("#firstname").value,
  lastname : document.querySelector("#lastname").value,
  email : document.querySelector("#email").value,
  adress : document.querySelector("#adress").value,
  zipcode : document.querySelector("#zipcode").value,
  city : document.querySelector("#city").value
}

//*************Controle du formulaire avec les REGEX***********//
const textAlert = (value) => {
  return `${value}: Chiffre et symbole ne sont pas autorisés`;
};

const regExFirstLastnameCity = (value) => {
  return /^[A-Za-z]{3,20}$/.test(value);
};
const regExZipCode = (value) => {
  return /^[0-9]{5}$/.test(value);
};

const regExEmail = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

const regExAdress = (value) => {
  return /^[A-Za-z0-9\s]{5,50}$/.test(value);
}

function firstNameControl() {
  //Controle validité prénom
  const theFirstName = formValues.firstname;
  if(regExFirstLastnameCity(theFirstName)) {
    return true;
  }else {
    alert(textAlert("Prénom"));
    return false;
  }
}

function lastNameControl() {
  //Controle validité nom
  const theLastName = formValues.lastname;
  if(regExFirstLastnameCity(theLastName)) {
    return true;
  }else {
    alert(textAlert("Nom"));
    return false;
  }
}

function zipCodeControl() {
  //Controle validité code postal
  const theZipcCode = formValues.zipcode;
  if(regExZipCode(theZipcCode)) {
    return true;
  }else {
    alert("Code Postal: doit être composé de 5 chiffres");
    return false;
  }
}

function emailControl() {
  //Controle validité email
  const theEmail = formValues.email;
  if(regExEmail(theEmail)) {
    return true;
  }else {
    alert("L'email n'est pas valide: doit contenir @ et '.' ");
    return false;
  }
}

function adressControl() {
  //Controle validité adresse
  const theAdress = formValues.adress;
  if(regExAdress(theAdress)) {
    return true;
  }else {
    alert("L'adresse doit contenir que des lettres et des chiffres");
    return false;
  }
}

function cityControl() {
  //Controle validité ville
  const theCity = formValues.city;
  if(regExFirstLastnameCity(theCity)) {
    return true;
  }else {
    alert("La ville doit contenir que des lettres");
    return false;
  }
}
/////////
const products = [];
    for (let t = 0; t < productStorage.length; t++) {
        let getId = productStorage[t].idProduct;
        products.push(getId);
    }

//Controle validité formulaire avant envoie dans le local storage
if(firstNameControl() && lastNameControl() && zipCodeControl() && emailControl() && adressControl() && cityControl()) {
// Mettre l'objet form dans le local storage
localStorage.setItem("FormValues", JSON.stringify(formValues));

} else {
  alert("Veuillez bien remplir le formulaire");
 
}
// Valeurs formulaire et produits dans un objet à envoyer au serveur
const toSend = {
  products,
  formValues,
}
console.log(formValues);
console.log(products);

const order = fetch(`http://localhost:3000/api/cameras/order`, {
  method: 'POST',
  body: JSON.stringify(toSend),
  headers: {
    "Content-Type" : "application/json",
  },
});
// Résultat du serveur
order.then(async(res) => {
  try{
    const content = await res.json();
    localStorage.setItem("orderId", products);
    document.location.href = "checkorder.html";
   

  }catch(e){
    alert(error);
  }
})










})





