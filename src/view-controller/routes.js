import { components } from './index.js'
import { readWaiter, saveOrderList, printOrder, resetWaiter } from './functions.js'
import { readData } from '../firestore.js';
import { readOrders, filterValueBtn } from '../view-controller/functionsChef.js'
export const changehash = (hash) => {
    window.location.hash = hash;
}

export const changeTmp = (hash) => {
    if (hash === '#/' || hash === '' || hash === '#') {
        return changeView('#/home');
    } else if (hash === '#/waiter') {
        return changeView('#/waiter');
    }
    else {
        return changeView('#/chef')
    }
}

let unsubscribeSnapshotwaiter = null
let unsubscribeSnapshotwaiterChef = null
export const changeView = (route) => {
    const main = document.getElementById("main");
    main.innerHTML = '';
    switch (route) {
        case '#/home': {
            main.appendChild(components.home());
            break;
        }
        case '#/waiter': {
            if (unsubscribeSnapshotwaiterChef) { unsubscribeSnapshotwaiterChef() }
            main.appendChild(components.waiter());
            unsubscribeSnapshotwaiter = readData('menumañana', 'Producto', (query) => {
                readWaiter(query);
                printOrder();
                saveOrderList();
            });
            resetWaiter();
            break;
        }
        case '#/chef': {
            if (unsubscribeSnapshotwaiter) { unsubscribeSnapshotwaiter() }
            main.appendChild(components.chef());
            unsubscribeSnapshotwaiterChef = readData('order', 'createdAt', (query) => {
                readOrders(query);
            })
            filterValueBtn();
            break;
        }
        default: {
            main.appendChild(components.home())
        }
    }
}


export const init = () => {
    window.addEventListener('load', changeTmp(window.location.hash));
    event.currentTarget.addEventListener('hashchange', () => {
        changeTmp(window.location.hash);
    })
}