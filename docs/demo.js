function addFlashy(type) {
    Flashy('.flashy-default', {
        type: type,
        title: 'Created Flashy ' + type,
        message: 'This is a created Flashy ' + type,
        expiry: 0,
        globalClose: true,
    });
}

function toggleCode(elem, value) {
    var elem;

    if (typeof elem === 'string') {
        elem = document.querySelector(elem);
    }
    console.log(elem, value);
    elem.style.display =
        value === undefined
            ? elem.style.display === 'none'
                ? 'block'
                : 'none'
            : value;
}

var toggleVal = 'block';
function toggleAllCode() {
    var codeSnips = document.querySelectorAll('.code');
    toggleVal = toggleVal === 'block' ? 'none' : 'block';
    for (var i = 0; i < codeSnips.length; i++) {
        var codeSnip = codeSnips[i];
        toggleCode(codeSnip, toggleVal);
    }
}

function randomType() {
    var types = ['error', 'warning', 'info', 'success'];
    return types[Math.floor(Math.random() * 4)];
}

function customStylingFlash(querySelector) {
    Flashy(querySelector, {
        type: 'info',
        title: 'custom styling',
        message: 'look at these styles',
        globalClose: true,
        styles: {
            flashColor: '#3d3737',
            titleTextColor: 'salmon',
            msgTextColor: 'salmon',
            titleTextFont: `Arial, "Helvetica Neue",
                Helvetica, sans-serif`,
            msgTextFont: `Arial, "Helvetica Neue",
                Helvetica, sans-serif`,
            iconBackgroundColor: '#291010',
        },
    });
}

function customEmojiFlash(querySelector) {
    Flashy(querySelector, {
        type: 'info',
        title: 'custom emoji',
        message: 'check out the emoji!',
        globalClose: true,
        styles: {
            icon: {
                type: 'unicode',
                val: '🤑',
            },
        },
    });
}

function promptFlash(querySelector) {
    Flashy(querySelector, {
        type: 'success',
        title: 'something happened',
        message: 'you have to click ok',
        globalClose: false,
        buttons: [
            {
                text: 'OK',
                closesFlash: true,
            },
        ],
    });
}

function multipleButtonsFlash(querySelector) {
    Flashy(querySelector, {
        type: 'error',
        title: 'something happened',
        message: 'you can click okay or cancel',
        globalClose: false,
        buttons: [
            {
                text: 'OK',
                closesFlash: true,
            },
            {
                text: 'Cancel',
                closesFlash: true,
            },
        ],
        styles: {
            linkTextColor: 'black',
        },
    });
}

function customActionFlash(querySelector) {
    function secretFunction() {
        alert('wow');
    }

    Flashy(querySelector, {
        type: 'warning',
        title: 'something happened',
        message: 'click ok!',
        globalClose: true,
        buttons: [
            {
                text: 'OK',
                closesFlash: false,
                action: secretFunction,
            },
        ],
    });
}

function defaultFlash(querySelector, type) {
    Flashy(querySelector, {
        type: type,
        title: type + ' example',
        message: 'This is what a ' + type + ' flash looks like!',
        globalClose: true,
    });
}

window.addEventListener('load', function() {
    Flashy('.flashy-default', {
        type: 'success',
        title: 'Welcome to Flashy!',
        message: 'This is a flashy message',
        globalClose: true,
        expiry: 5000,
        buttons: [
            {
                text: 'Go away!',
                closesFlash: true,
            },
        ],
    });

    setTimeout(function() {
        setTimeout(function() {
            setTimeout(function() {
                Flashy('.flashy-default', {
                    type: 'warning',
                    title: 'Start of a queue',
                    message: "I'm the first message in the queue",
                    globalClose: true,
                });
            }, 1000);
            setTimeout(function() {
                Flashy('.flashy-default', {
                    type: 'success',
                    title: 'Number 2',
                    message: 'I just pushed that last guy down',
                    globalClose: true,
                });
            }, 2000);

            setTimeout(function() {
                Flashy('.flashy-default', {
                    type: 'error',
                    title: '... And finally',
                    message: 'Close me and see what happens',
                    globalClose: true,
                });
            }, 3000);
        }, 6000);
        Flashy('.flashy-default', {
            type: 'info',
            title: 'Flashy Positioning',
            message: 'Flashy messages appear in the bottom-left',
            expiry: 5000,
            globalClose: true,
        });
    }, 6000);

    defaultFlash('.flashy-inline-1', 'error');
    defaultFlash('.flashy-inline-2', 'warning');
    defaultFlash('.flashy-inline-3', 'info');
    defaultFlash('.flashy-inline-4', 'success');

    customStylingFlash('.flashy-inline-5');
    customEmojiFlash('.flashy-inline-6');

    promptFlash('.flashy-inline-7');
    multipleButtonsFlash('.flashy-inline-8');
    customActionFlash('.flashy-inline-9');
});
