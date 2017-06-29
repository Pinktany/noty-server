function getDefaultStyle() {
    let defaultStyle = localStorage.getItem('defaultStyle');
    if (!defaultStyle) {
        localStorage.setItem('defaultStyle', 'css/lila-mist.css');
        defaultStyle = localStorage.getItem('defaultStyle');
    }
    return defaultStyle;
}

let styleSwitcher = document.getElementById("styleswitcher");
let defaultStyle = getDefaultStyle();
$("#styleswitcher").val(defaultStyle);
activateStyle(defaultStyle);
styleSwitcher.addEventListener('change', onStyleChanged);

function onStyleChanged() {
    let selectedStyle = $("#styleswitcher").val();
    activateStyle(selectedStyle);
    setDefaultStyle(selectedStyle);
}

function activateStyle(style) {
    document.getElementById('defaultstyle').href = style;
}

function setDefaultStyle(style) {
    localStorage.setItem('defaultStyle', style);
}