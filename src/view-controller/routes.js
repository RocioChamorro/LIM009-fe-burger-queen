import { components } from './index.js'
import {readWaiter, saveOrderList, printOrder, resetWaiter} from './functions.js'
import { readData } from '../firestore.js';
import { readOrders, filterValueBtn} from '../view-controller/functionsChef.js'
export const changehash = (hash) => {
    window.location.hash = hash;
}

export const changeTmp = (hash) => {
    if (hash === '#/' || hash === '' || hash === '#') {
        return changeView('#/home');
    }  else if ( hash === '#/waiter' ){
        return changeView('#/waiter');
    }   
    else {
        return changeView('#/chef')
    }
} 

export const changeView = (route) => {
    const main = document.getElementById("main");
    main.innerHTML = '';
    switch (route) {
        case '#/home': { 
            main.appendChild(components.home());
            break;
        }
        case '#/waiter': {
            main.appendChild(components.waiter());
            readData('menumañana', 'Producto', (query) => {
               readWaiter(query);
               printOrder();
               saveOrderList();
            });
            resetWaiter();
            break;
        }
        case '#/chef': { 
            main.appendChild(components.chef());
            readData('order', 'createdAt', (query) => {
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