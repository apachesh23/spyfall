function createColorPalette(appendTo, targetElement) {
    const colorPalette = document.createElement("input");
    colorPalette.type = "color"; // Это поле выбора цвета
    colorPalette.style.background = "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
    colorPalette.style.display = "block";
    colorPalette.style.position = "relative";
    colorPalette.style.bottom = "29px";
    colorPalette.style.left = "101px";
    colorPalette.style.width = "80px";
    colorPalette.style.height = "24px";
    colorPalette.style.padding = "0";

    colorPalette.addEventListener("input", function() {
        const selectedColor = colorPalette.value;
        targetElement.style.backgroundColor = selectedColor;
    });

    appendTo.appendChild(colorPalette);
}

function createSliderWithLabel(id, labelName, leftPosition, bottomPosition, callback) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "200";
    slider.value = "100";
    slider.id = id;
    slider.style.display = "block";
    slider.style.position = "relative";
    slider.style.bottom = bottomPosition;
    slider.style.left = leftPosition;
    slider.style.width = "80px";
    slider.addEventListener("input", callback);

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelName;
    label.style.position = "relative";
    label.style.bottom = (parseInt(bottomPosition, 10) + 15) + "px"; 
    label.style.left = leftPosition;
    label.style.display = "block";

    return { slider, label };
}

function adjustFilters() {
    const canvasElement = document.getElementById("canvas");
    canvasElement.style.filter = `contrast(${contrastSlider.value}%) brightness(${brightnessSlider.value}%)`;
}

function resetToDefault() {
    contrastSlider.value = "100";
    brightnessSlider.value = "100";
    adjustFilters();
}

const customColorPicker = document.querySelector("#custom-color-picker");

// Палитра цветов
createColorPalette(customColorPicker, document.querySelector("#svgRed"));

// Ползунки и лейблы
const { slider: contrastSlider, label: contrastLabel } = createSliderWithLabel("contrast-slider", "Контраст", "410px", "54px", adjustFilters);
customColorPicker.appendChild(contrastLabel);
customColorPicker.appendChild(contrastSlider);

const { slider: brightnessSlider, label: brightnessLabel } = createSliderWithLabel("brightness-slider", "Яркость", "500px", "75px", adjustFilters);
customColorPicker.appendChild(brightnessLabel);
customColorPicker.appendChild(brightnessSlider);

// Кнопка сброса
const resetButton = document.createElement("button");
resetButton.textContent = "Сброс";
resetButton.type = "button";
resetButton.style.display = "block";
resetButton.style.position = "relative";
resetButton.style.left = "594px";
resetButton.style.bottom = "98px";
resetButton.addEventListener("click", resetToDefault);
customColorPicker.appendChild(resetButton);
