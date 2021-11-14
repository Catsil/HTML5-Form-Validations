window.onload = function() {
  isText(NAME.value);
  console.log("hola");
};

const CARD = document.querySelector("#inputCard");
const CVC = document.querySelector("#inputCodigo");
const AMOUNT = document.querySelector("#basic-url");
const NAME = document.querySelector("#inputFirstName");
const LASTNAME = document.querySelector("#inputLastName");
const CITY = document.querySelector("#inputCity");
const STATE = document.querySelector("#exampleDataList");
const ZIP = document.querySelector("#inputZip");
const MESSAGE = document.querySelector("#message-text");
const LIST = document.querySelectorAll("option");
const SUBMIT = document.querySelector("#form");
const RESET = document.querySelector("#reset");
const SUCCESS = document.querySelector("#success");
const FAIL = document.querySelector("#fail");

let stateValues = [];

for (const element in LIST) {
  stateValues.push(LIST[element].value);
  console.log(stateValues);
}

STATE.addEventListener("focusout", () => {
  stateValues.some(e => e == STATE.value) ? isValid(STATE) : isInvalid(STATE);
});

CARD.addEventListener("focusout", () => {
  if (
    CARD.value.length >= 16 &&
    CARD.value.length <= 19 &&
    CARD.value &&
    valid_credit_card(CARD.value)
  ) {
    isValid(CARD);
  } else {
    isInvalid(CARD);
  }
});
CVC.addEventListener("focusout", () => {
  if (
    CVC.value.length == 3 &&
    CVC.value.length <= 4 &&
    isNumb(CVC.value) &&
    isRealNum(CVC.value)
  ) {
    isValid(CVC);
  } else {
    isInvalid(CVC);
  }
});
AMOUNT.addEventListener("focusout", () => {
  if (AMOUNT.value >= 20) {
    isValid(AMOUNT);
  } else {
    isInvalid(AMOUNT);
  }
});
NAME.addEventListener("focusout", () => {
  isText(NAME.value) ? isValid(NAME) : isInvalid(NAME);
});
LASTNAME.addEventListener("focusout", () => {
  isText(LASTNAME.value) ? isValid(LASTNAME) : isInvalid(LASTNAME);
});

CITY.addEventListener("focusout", () => {
  isText(CITY.value) ? isValid(CITY) : isInvalid(CITY);
});

ZIP.addEventListener("focusout", () => {
  if (ZIP.value.length == 5 && isRealNum(ZIP.value)) {
    isValid(ZIP);
  } else {
    isInvalid(ZIP);
  }
});

MESSAGE.addEventListener("focusout", () => {
  if (
    MESSAGE.value.length >= 1 &&
    MESSAGE.value.length <= 100 &&
    isText(MESSAGE.value)
  ) {
    isValid(MESSAGE);
  } else {
    isInvalid(MESSAGE);
  }
});
SUBMIT.addEventListener("submit", event => {
  event.preventDefault();
  if (
    CARD.classList.contains("is-valid") &&
    CVC.classList.contains("is-valid") &&
    AMOUNT.classList.contains("is-valid") &&
    NAME.classList.contains("is-valid") &&
    LASTNAME.classList.contains("is-valid") &&
    CITY.classList.contains("is-valid") &&
    STATE.classList.contains("is-valid") &&
    ZIP.classList.contains("is-valid") &&
    MESSAGE.classList.contains("is-valid")
  ) {
    SUCCESS.classList.remove("d-none");
    SUCCESS.classList.add("d-block");
    FAIL.classList.remove("d-block");
    FAIL.classList.add("d-none");
  } else {
    FAIL.classList.remove("d-none");
    FAIL.classList.add("d-block");
    SUCCESS.classList.remove("d-block");
    SUCCESS.classList.add("d-none");
  }
});

const isValid = input => {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
};
const isInvalid = input => {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
};

const isText = text => {
  return /^[a-zñA-ZÑ-áéíóú ]+$/.test(text);
};

const isNumb = number => {
  return /^[0-9]/.test(number);
};
const isRealNum = numb => {
  return numb % 1 == 0 && numb >= 0;
};

const valid_credit_card = value => {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
};
