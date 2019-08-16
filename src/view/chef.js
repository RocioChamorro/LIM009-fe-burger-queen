import {unsusbcribe} from '../view-controller/functionsChef.js'
import {changehash} from '../view-controller/routes.js'

export default () => {
    const div = document.createElement('div');
    const tmp3 = `<header class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
        <img class="imgLogo" src="../images/logoHeader.png" width="70" height="30" class="d-inline-block align-top" alt="logo">
            Burger Queen
        </a>
        <button id='hacerPedido' class='btn btn-outline-warning btn-sm'>Hacer pedido</button>
    </header>
    <div class="btnsFilter">
    <button id='enPreparacion' class='btnFilter btn btn-warning' type='button' value='En preparación'>En preparación</button>
    <button id='preparado' class='btnFilter btn btn-warning' type='button' value='Preparado'>Preparado</button>
    <button id='entregado' class='btnFilter btn btn-warning' type='button' value='Entregado'>Entregado</button>
    </div>
    <div id='containerChef'></div>
    `
    div.innerHTML = tmp3;
    div.querySelector('#hacerPedido').addEventListener('click', ()=>{
        if (unsusbcribe) {console.log(unsusbcribe())}
        changehash('#/waiter');
    })
    return div;  
};

