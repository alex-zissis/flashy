window.onload = function () {
    console.log('flashy')
    const style = document.createElement('style');
    style.textContent = `
        flash-messages {
            position: fixed;
            display: flex;
            flex-wrap: wrap;
            left: 10px;
            bottom: 0px;
            height: 10%;
            width: 17%;
            font-family: sans-serif;
            min-width: 300px;
            min-height: 100px;
        }
    `;
    document.querySelector('body').appendChild(style);
}

function triggerAnimation(duration, className, element) {
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), duration);
}

class FlashMessages extends HTMLElement {
    constructor() {
        super();

        setTimeout(() => {
            this.maxMessages = this.dataset["maxMessages"] || 10;
        }, 0);


        const style = document.createElement('style');

        style.textContent = `
        .flash-message {
            width: 100%;
            height: 80%;
            margin-bottom: 5%;
            padding: 15px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
            -moz-box-sizing: border-box;    /* Firefox, other Gecko */
            box-sizing: border-box;         /* Opera/IE 8+ */
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border-radius: 10px;
            background-color: #ecf0f1;
            font-family: 'Roboto', sans-serif;
            display: flex;
            position: relative;
        }
       
        .flash-message:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        }
       
        .flash-message.error {
            background-color: #ff6060;
        }
 
        .flash-message.error > .left-part {
            background-color: #ff3535;
        }
       
        .flash-message.info {
            background-color: #59c9f9;
        }
 
        .flash-message.info > .left-part {
            background-color: #32c0ff;
        }
       
        .flash-message.success {
            background-color: #39c16c;
        }
 
        .flash-message.success > .left-part {
            background-color: #33ad61;
        }
       
        .flash-message.warning {
            background-color: #ffc744;
        }
 
        .flash-message.warning > .left-part {
            background-color: #ffba1c;
        }
       
        .left-part {
            display: inline-block;
            height: 100%;
            width: 25%;
            padding-top: 15px;
            padding-bottom: 15px;
            margin-top: -15px;
            margin-left: -15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3em;
            border-radius: 10px 0 0 10px;
        }
 
        .right-part {
            display: inline-block;
           
            margin-top: -15px;
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 10px;
        }
       
        .flash-title {
            display: block;
            font-size: 1.2em;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            color: white;
        }
       
        .flash-msg {
            margin-top: 3px;
            display: block;
            color: white;
            font-family: 'Roboto', sans-serif;
            font-weight: 300;
            font-size: .8em;
        }
       
        .close-flash {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            position: absolute;
            right: -8px;
            top: -8px;
            width: 22px;
            height: 22px;
            background-color: #f1f1f1;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #7f8c8d;
            font-size: .8em;
        }
       
        .close-flash:hover {
            cursor: pointer;
            color: #e74c3c;
        }

        .flashy-button {
            color: #1663fc;
            font-size: .8em;
            font-align: center;
            padding-left: 5px;
            padding-right: 5px;
        }

        .flashy-button:nth-child(0) {
            padding-left: 0;
        }

        .flashy-button:hover {
            cursor: pointer;
            text-decoration: underline;
        }

        .flashy-seperator {

        }
       
        .movein {
            animation-name: movein;
            animation-duration: .2s;
        }
       
        .movedown {
            animation-name: movedown;
            animation-duration: .2s;
        }
       
        .moveup {
            animation-name: moveup;
            animation-duration: .2s;
        }
       
        .fade {
            animation-name: fade;
            animation-duration: .2s;
            opacity: 0;
        }
       
        @keyframes moveup {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0%);
            }
        }
       
        @keyframes movedown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
       
        @keyframes movein {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }
       
        @keyframes fade {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        `

        this.shadowRootObj = this.attachShadow({ mode: 'open' });
        this.shadowRootObj.appendChild(style);
    }

    remove_child(elem) {
        elem.classList.add('fade');
        setTimeout(() => {
            if (elem.nextElementSibling) {
                triggerAnimation(200, 'moveup', elem.nextElementSibling);
            };
            if (elem.nextElementSibling.nextElementSibling) {
                triggerAnimation(200, 'moveup', elem.nextElementSibling.nextElementSibling);
            }
            elem.remove();
        }, 200);
    }

    create_child(options) {
        const emoji = {
            error: '😨',
            warning: '😶',
            success: '😇',
            info: '😜'
        }
        let icon = emoji[options.type];

        if (options.styles) {
            if (options.styles.icon) {
                if (options.styles.icon.type === 'unicode') {
                    icon = options.styles.icon.val;
                }
            }
        }

        const newFlash = document.createElement('div');
        newFlash.classList.add('flash-message');
        newFlash.classList.add(options.type);
        if (options.styles && options.styles.flashColor) {
            newFlash.style.backgroundColor = options.styles.flashColor;
        }
        triggerAnimation(200, 'movein', newFlash);

        const leftPart = document.createElement('div');
        leftPart.classList.add('left-part');
        leftPart.innerHTML = icon;
        if (options.styles && options.styles.iconBackgroundColor) {
            leftPart.style.backgroundColor = options.styles.iconBackgroundColor;
        }
        newFlash.appendChild(leftPart);

        const rightPart = document.createElement('div');
        rightPart.classList.add('right-part');
        newFlash.appendChild(rightPart);

        const ttl = document.createElement('span');
        ttl.innerHTML = options.title;
        ttl.classList.add('flash-title');
        if (options.styles) {
            if (options.styles.titleTextColor) {
                ttl.style.color = options.styles.titleTextColor;
            }

            if (options.styles.titleTextFont) {
                ttl.style.fontFamily = options.styles.titleTextFont;
            }
        }
        rightPart.appendChild(ttl);

        const msg = document.createElement('span');
        msg.innerHTML = options.message;
        msg.classList.add('flash-msg');
        if (options.styles) {
            if (options.styles.msgTextColor) {
                msg.style.color = options.styles.msgTextColor;
            }

            if (options.styles.msgTextFont) {
                msg.style.fontFamily = options.styles.msgTextFont;
            }
        }
        rightPart.appendChild(msg);

        if (options.buttons) {
            for (const [i, button] of options.buttons.entries()) {
                const btn = document.createElement('span');
                btn.classList.add('flashy-button');
                btn.innerHTML = button.text;
                btn.addEventListener('click', event => {
                    if (button.action) {
                        button.action();
                    }
                    if (button.closesFlash) {
                        this.remove_child(btn.parentElement.parentElement)
                    }
                });
                if (options.styles) {
                    if (options.styles.linkTextColor) {
                        btn.style.color = options.styles.linkTextColor;
                    }

                    if (options.styles.linkTextFont) {
                        btn.style.fontFamily = options.styles.linkTextFont;
                    }
                }
                rightPart.appendChild(btn);
                if (i !== options.buttons.length - 1) {
                    const sep = document.createElement('span');
                    sep.classList.add('flashy-seperator');
                    sep.innerHTML = '·';
                    rightPart.appendChild(sep);
                }
            }
        }
        if (options.globalClose) {
            const span = document.createElement('div');
            span.innerHTML = 'X';
            span.classList.add('close-flash');
            span.addEventListener('click', event => {
                const flashElem = event.srcElement.parentElement || event.target.parentElement;
                this.remove_child(flashElem);
            });
            newFlash.appendChild(span);
        }

        return newFlash;
    }

    add_child(options) {
        const newFlash = this.create_child(options);

        const length = this.shadowRootObj.children.length;

        if (length - 1 >= this.maxMessages) {
            this.shadowRootObj.lastChild.previousSibling.remove();
        }

        this.shadowRootObj.insertBefore(newFlash, this.shadowRootObj.firstChild);
        if (newFlash.nextElementSibling) {
            triggerAnimation(200, 'movedown', newFlash.nextElementSibling);
        }

        if (options.expiry > 0) {
            setTimeout(() => this.remove_child(newFlash), options.expiry)
        }

    }
}

window.customElements.define('flash-messages', FlashMessages);

Flashy = function (selector, options) {
    document.querySelector(selector).add_child(options)
}

Flashy.config = function () {
    console.log('config')
}

export default Flashy;
