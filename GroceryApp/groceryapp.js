let storeNameTextBox = document.getElementById("storeNameTextBox");
let storeAddressTextBox = document.getElementById("storeAddressTextBox");
let addStore = document.getElementById("addStore");
let storeContainer = document.getElementById("storeContainer");

addStore.addEventListener("click", function() {
    let storeName = storeNameTextBox.value;
    let storeAddress = storeAddressTextBox.value;

    db.collection("stores")
        .add({
            name: storeName,
            address: storeAddress
        }).then(function(docRef) {
            displayStores()
        })
})

function deleteStore(documentId) {
    db.collection("stores")
    .doc(documentId)
    .delete()
    .then(() => {
        displayStores()
    })
}

function displayStores() {
    storeContainer.innerHTML = "";

    db.collection("stores")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                // console.log(doc)
                // console.log(doc.id)
                let data = doc.data()
                let indivStore = `<ul>
                <b class="storeName">${data.name}</b>
                <p class="storeAddress">Address: ${data.address}</p>
                <button onclick="deleteStore('${doc.id}')">Delete Store</button>
                </ul>`

                storeContainer.insertAdjacentHTML('beforeend', indivStore)
            })
        })
}

displayStores()