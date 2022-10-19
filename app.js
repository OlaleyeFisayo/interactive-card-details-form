const cardName =  document.querySelector('.cardName');
const cardNumber = document.querySelector('.cardNumber');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const cvc = document.querySelector('.cvc');
const cardNameInput = document.querySelector('#cardholderName');
const cardNumberInput = document.querySelector('#cardNumberInput');
const monthInput = document.querySelector('#mm');
const yearInput = document.querySelector('#yy');
const cvcInput = document.querySelector('#cvc');
const visibility = document.querySelectorAll('.visibility');
const cardOne = document.querySelector('.cardOne');
const cardTwo = document.querySelector('.cardTwo');
const confirmOne = document.querySelector('#confirmOne');
const confirmTwo = document.querySelector('#confirmTwo');

signs = [' '];
pattern = cardNumberInput.dataset.pattern.split('');

// align inputs with card 
cardNameInput.addEventListener('input', ()=> {
    cardName.textContent = cardNameInput.value.toUpperCase();
    if(cardNameInput.value == "") {
        cardName.textContent =  "JANE APPLESEED"
    }
    if(cardNameInput.hasAttribute("required")) {
        cardNameInput.removeAttribute("required");
    }
});

cardNumberInput.addEventListener('keypress', e => {
    if(cardNumberInput.value.length == 19) {
        return
    }
    e.preventDefault();
    check(e.key)
})

function check(char) {
    if (signs.includes(pattern[cardNumberInput.value.length])) {
        cardNumberInput.value += pattern[cardNumberInput.value.length]
        if(signs.includes(pattern[cardNumberInput.value.length])) {
            check((pattern[cardNumberInput.value.length]))
        }
    }
    cardNumberInput.value += char;
}

cardNumberInput.addEventListener('keyup', e => {
    length = cardNumberInput.value.length;
    cardNumber.textContent = cardNumberInput.value;
    if(cardNumberInput.value == "") {
        cardNumber.textContent = "0000 0000 0000 0000"
    }
    visibility[1].textContent = "";
    if(cardNumberInput.hasAttribute("required")) {
        cardNumberInput.removeAttribute("required")
    }
});

monthInput.addEventListener('input', ()=> {
    if(monthInput.value[0] > 1) {
        monthInput.value = `0${monthInput.value}`;
    }
    if(monthInput.value[0] == 1 && monthInput.value[1] > 2) {
        monthInput.value = `${monthInput.value[0]}2`
    }
    month.textContent = monthInput.value;
    if(monthInput.value == "") {
        month.textContent = "00";
    }
    if(monthInput.hasAttribute("required")) {
        monthInput.removeAttribute("required");
        visibility[2].textContent = "";
        if(yearInput.value == "") {
            visibility[3].textContent = "Can't be blank";
        }
    }
})

yearInput.addEventListener('input', ()=> {
    year.textContent = yearInput.value;
    if(yearInput.value == "") {
        year.textContent = "00";
    }
    if(yearInput.hasAttribute("required")) {
        yearInput.removeAttribute("required");
        visibility[3].textContent = "";
    }
})

cvcInput.addEventListener('input', ()=> {
    cvc.textContent = cvcInput.value;
    if(cvcInput.value == "") {
        cvc.textContent = "000";
    }
    visibility[4].textContent = "";
    if(cvcInput.hasAttribute("required")) {
        cvcInput.removeAttribute("required")
    }
})

//confirm button
confirmOne.addEventListener('click', ()=> {
    //form validation
    if(cardNameInput.value == "" || cardNumberInput.value == "" || monthInput.value == "" || yearInput.value == "" || cvcInput.value == "") {

        if(cardNameInput.value == null || cardNameInput.value == "" ) {
            cardNameInput.setAttribute("required", true);
        } else {
            cardNameInput.removeAttribute("required");
        }
    
        if(cardNumberInput.value == "") {
            cardNumberInput.setAttribute("required", true);
            visibility[1].textContent = ""
        } else {
            cardNumberInput.removeAttribute("required");
        }
        if(cardNumberInput.value.length < 19 && cardNumberInput.value > 0) {
            visibility[1].textContent = "Needs to be 16 digits";
        }
    
        if(monthInput.value == "") {
            monthInput.setAttribute("required", true);
            visibility[2].textContent = "Can't be blank";
        } else {
            monthInput.removeAttribute("required");
            visibility[2].textContent = "";
        }


        if(yearInput.value == "") {
            yearInput.setAttribute("required", true);
            if(monthInput.value != "") {
                visibility[3].textContent = "Can't be blank";
            }
        } else {
            yearInput.removeAttribute("required");
            visibility[3].textContent = "";
        }
    
        if(cvcInput.value == "") {
            cvcInput.setAttribute("required", true);
            visibility[4].textContent = "";
        } else {
            cvcInput.removeAttribute("required");
        }
        if(cvcInput.value.length < 3 && cvcInput.value != "" ) {
            visibility[4].textContent = "3 digits at least";
        }
        return;
    }else if(cardNumberInput.value != "" || cvcInput.value != "") {
        if(cardNumberInput.value.length != 19) {
            visibility[1].textContent = "Needs to be 16 digits";
            return;
        }
        if(cvcInput.value.length != 3) {
            visibility[4].textContent = "3 digits at least";
            return;
        }
    }
    cardOne.classList.add("hidden");
    cardTwo.classList.remove("hidden");
})

confirmTwo.addEventListener('click', ()=> {
    location.reload()
})