
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
let str = `
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    opacity: 0;
    transform: translateX(-100%);
    
    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
        to right, 
        rgba(255, 255, 255, 0.13) 0%,
        rgba(255, 255, 255, 0.13) 77%,
        rgba(255, 255, 255, 0.5) 92%,
        rgba(255, 255, 255, 0.3) 100%
    );
`
let str2 = `
    opacity: 1;
    top: 0;
    left: 0;
    transform: translateX(0);
    transition-property: transform, opacity;
    transition-duration: 0.7s, 0.15s;
    transition-timing-function: ease;
`

const buttonStyle = `
    display:flex;
    position: absolute;
    right: 0px;
    top: 0px;

    width: 30px;
    height: 30px;
    max-height: 100%;

    background: #E0E5EC;
    border: none;
    border-radius: 6px;
    box-shadow: -2px 2px 10px rgb(163,177,198,0.1), -9px -9px 16px rgba(255,255,255, 0.5);

    color: #4D3252;
    font-weight: 700;

    overflow: hidden;
    text-transform: uppercase;
    cursor: pointer;
`
const buttonHoverStyle = `
    opacity: 0.85;
    cursor: pointer;
    background: #cce0f0;
`

const css = `
    .copy-button:{${buttonStyle}};
    .copy-button:hover{${buttonHoverStyle}};
    button:focus{
        outline: 0;
    }
    p{color: red};
    pre::after{${str}};
    pre::hover::after{${str2}};
`

//Append styles

const styless = document.createElement('style');
styless.innerHTML = `
      .copy-button{
          ${buttonStyle}
      }
      .copy-button:hover{
          ${buttonHoverStyle}
      }
      .effect-initial:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        opacity: 0;
        transform: translateX(-100%);
        
        background: rgba(255, 255, 255, 0.20);
        background: linear-gradient(
          to right, 
          rgba(255, 255, 255, 0.20) 0%,
          rgba(255, 255, 255, 0.20) 77%,
          rgba(255, 255, 255, 0.5) 92%,
          rgba(255, 255, 255, 0.3) 100%
        );
      }
      .effect-end:after {
        opacity: 1;
        top: 0;
        left: 0;
        transform: translateX(0);
        transition-property: transform, opacity;
        transition-duration: 0.7s, 0.15s;
        transition-timing-function: ease;
      }
    `;
document.head.appendChild(styless);

document.querySelectorAll("pre").forEach(element => {
    const img = document.createElement("img");
    img.src = "https://img.icons8.com/external-aficons-studio-flat-aficons-studio/344/external-copy-user-interface-aficons-studio-flat-aficons-studio.png";
    img.style = "height: 80%; margin: auto"

    element.style.position = "relative";

    let text = element.innerText;

    let newIcon = document.createElement("div");
    newIcon.className = "copy-button";
    newIcon.type = "button";
    newIcon.appendChild(img);
    element.classList.add("effect-initial")
    //copy to clickboard
    newIcon.onclick = () => {
        element.classList.add("effect-end")
        setTimeout(() => {
            element.classList.remove("effect-end")
        }, 200)
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