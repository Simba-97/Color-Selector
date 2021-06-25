const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');


hexInput.addEventListener('keyup', ()=> {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    inputColor.style.background = '#' + strippedHex;
})

const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r, g, b}
}

const convertRGBToHex = (r, g, b) => {
    const first = ("0" + r.toString(16)).slice(-2);
    const second = ("0" + g.toString(16)).slice(-2);
    const third = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + first + second + third;
    return hex;
}

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage/100) * 255);

    const newR = r + amount;
    const newG = g + amount;
    const newB = b + amount;

    return convertHexToRGB(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    if(newHex > 255) return 255;
    if(newHex < 0) return 0;
    return newHex;
}

slider.addEventListener('input', () => {
    if(!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;
    
    const alteredHex = alterColor(hexInput.value, slider.value);
    alterColor.style.background = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
})
