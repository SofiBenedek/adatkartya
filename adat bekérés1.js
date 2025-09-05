document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const zipInput = document.getElementById('zipcode');
    const townInput = document.getElementById('town');
    const streetInput = document.getElementById('street');
    const numberInput = document.getElementById('number');

    const saveBtn = document.getElementById('save');

    const card = document.getElementById('card');

    const cardName = document.getElementById('cardName');
    const cardZip = document.getElementById('cardZipcode');
    const cardTown = document.getElementById('cardTown');
    const cardStreet = document.getElementById('cardStreet');
    const cardNumber = document.getElementById('cardNumber');

    const saved = localStorage.getItem('userData');
    if (saved) {
        const data = JSON.parse(saved);
        nameInput.value = data.name;
        zipInput.value = data.zipcode;
        townInput.value = data.town;
        streetInput.value = data.street;
        numberInput.value = data.number;
        updateCard(data);
    }


    saveBtn.addEventListener('click', () => {
        const data = {
            name: nameInput.value,
            zipcode: zipInput.value,
            town: townInput.value,
            street: streetInput.value,
            number: numberInput.value
        };
        localStorage.setItem('userData', JSON.stringify(data));
        updateCard(data);
    });

    function updateCard(data) {
        cardName.textContent = data.name;
        cardZip.textContent = data.zipcode;
        cardTown.textContent = data.town;
        cardStreet.textContent = data.street;
        cardNumber.textContent = data.number;
        card.style.display = 'block';
    }
});
