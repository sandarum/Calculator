const output = document.querySelector('.output');

function setDisplayValue(value) {
    output.textContent = value;
}

function getDisplayValue() {
    return output.textContent;
}

function appendNumber(value) {
    if (getDisplayValue() === '0') {
        setDisplayValue(value);
    } else {
        setDisplayValue(getDisplayValue().concat(value));
    }
}

function appendDot() {
    if(!getDisplayValue().includes('.')){
        setDisplayValue(getDisplayValue().concat('.'));
    }
}

function clear() {
    setDisplayValue('0');
}

function deleteValue() {
    if(getDisplayValue().length !== 1) {
        setDisplayValue(getDisplayValue().slice(0,-1));
    }else{
        setDisplayValue('0');
    }
}

setDisplayValue('0');
