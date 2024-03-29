//Defining styles
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

    opacity: 0;
    transition: opacity 0.2s linear;
`
const buttonHoverStyle = `
    opacity: 0.85;
    cursor: pointer;
    background: #cce0f0;
`
const effectStart = `
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
`
const effectEnd = `
    opacity: 1;
    top: 0;
    left: 0;
    transform: translateX(0);
    transition-property: transform, opacity;
    transition-duration: 0.7s, 0.15s;
    transition-timing-function: ease;
`

//Appending styles
const style = document.createElement('style');
style.innerHTML = `
    .copy-button{
        ${buttonStyle}
    }
    .copy-button:hover{
        ${buttonHoverStyle}
    }
    .effect-initial:after {
        ${effectStart}
    }
    .effect-end:after {
        ${effectEnd}
    }
`;
document.head.appendChild(style);

CreateCopyButton = (text, aditionalFunction = () => {}, villate = false) => {
    //icon
    const img = document.createElement("img");
    img.src = "https://img.icons8.com/external-aficons-studio-flat-aficons-studio/344/external-copy-user-interface-aficons-studio-flat-aficons-studio.png";
    img.style = "height: 80%; margin: auto; border:none";

    //button
    let copyButton = document.createElement("div");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.appendChild(img);

    //onclick function
    copyButton.onclick = () => {
        //effect function
        aditionalFunction();

        //coping to clipboard
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(text);
        return Promise.reject('The Clipboard API is not available.');
    }

    if(!villate) return copyButton;

    //villate aditionals
    console.log(123);
    copyButton.style.opacity = 1;
    copyButton.style.position = "relative";
    copyButton.style.float = "right";
    copyButton.style.width = "23px";
    copyButton.style.height = "23px";

    return copyButton;
}

//Adding the copy buttons
document.querySelectorAll("pre").forEach( pre => {
    //VALUE
    let text = pre.innerText;

    //PRE TAG
    pre.style.position = "relative";
    pre.classList.add("effect-initial")

    //effect
    const fadeEffect = () => {
        pre.classList.add("effect-end")
        setTimeout(() => {
            pre.classList.remove("effect-end")
        }, 200)
    }

    //COPY FUNCTION
    let copyButton = CreateCopyButton(text, fadeEffect);

    //OPACITY EVENTS
    pre.onmouseover = () => copyButton.style.opacity = 1;
    pre.onmouseout = () => copyButton.style.opacity = 0;

    pre.append(copyButton)
})

//villate.org
const splitArray = (myArray, tag = "BR") => {
    let start_i = 0;
    let result = [];
    myArray.forEach((element, i) => {
        if(element.tagName == tag){
            result.push(myArray.slice(start_i, i))
            start_i = i+1
        }
    })
    result.push(myArray.slice(start_i, myArray.length))
    return result
}
const editArray = (myArray) => {
    let result = []
    for(let element of myArray){
        if(element[0].classList.contains('maxm')){
            result.push({
                text: element.slice(1).map(el => el.innerText).join(''),
                last: element.pop()
            })
        }
    }
    return result
}

document.querySelectorAll('.maxima').forEach(div => {
    const lines = editArray( splitArray([...div.children], "BR") );

    for(let line of lines){
        //BUTTON
        let copyButton = CreateCopyButton(line.text, function(){}, true);
        line.last.append(copyButton)
    }
})

/* Other functions */

//Removing all copy buttons of w3resource
if(window.location.hostname == "www.w3resource.com" || 
   window.location.hostname == "w3resource.com"){
    document.querySelectorAll(".toolbar").forEach(el => el.style.display = "none")
}

//Removing all "Select All" from forums.raspberrypi
document.querySelectorAll('.codebox').forEach(div => div.children[0].style.display = "none")

//moodle allow to select TODOS