
const styles = `
    background: url(https://developer.mozilla.org/static/media/clippy.92fffda9d37d9c3a3b37.svg);
    background-size: auto;
    height: 20px;
    width: 17px;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
    background-size: 20px;
    opacity: 0.7;
`

document.querySelectorAll("pre").forEach(element => {
    element.style.position = "relative";
    let text = element.innerText;
    let newIcon = document.createElement("div");
    newIcon.type = "button";
    newIcon.setAttribute("style", styles);
    newIcon.onclick = () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(text);
        return Promise.reject('The Clipboard API is not available.');
    }
    element.append(newIcon)
})

/*

<button type="button" class="icon copy-icon">
    <span class="visually-hidden">
        Copy to Clipboard
    </span><
/button>

*/