import { readWaiter, saveOrderList } from '../view-controller/functions.js'
import { readData } from '../firestore.js'

export default () => {
    const div = document.createElement('div');
    const tmp2 = `
    
    <header class="navbar navbar-light bg-light">  
        <a class="navbar-brand" href="#">
            <img class="imgLogo" src="../images/logoHeader.png" width="70" height="30" class="d-inline-block align-top" alt="logo">
            Burger Queen
        </a>
        <a class='btn btn-outline-warning btn-sm' href='#/chef'>Ver pedidos</a>
    </header>
    <div class="waiter">
        <div class="general">
            <div class="containerbuttons">
                <div class="contName"> 
                    <input id="name" type="text" class="form-control mr-sm-2" placeholder="Nombre del cliente"/>
                    <button id="addClient" class="btn btn-warning ">oK</button>
                    <p id='msmError' class='text-danger'</p>
                </div>
                <div id='btnsBreakLun' class='btn-group btn-group-toggle'>
                    <button class="btn btn-warning" id='breakfast'>Desayuno</button>
                    <button class="btn btn-outline-warning text-body" id='lunch'>Almuerzo y cena</button>
                </div>
                <div class="containerBtnCard" id="containerWaiter"></div>

               
            </div>

            <div class="containerOrders">
                <div id='containerTable'>
                    <h4 class ="name" id ="nameClient"></h4>
                    <table id="tableOrder" class="table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cant.</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tboby>
                            <tr></tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>TOTAL: </td>
                                <td id="total">s/ 0.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class='btnSumitReset'>
                    <div id="blockSubmit"></div>
                    <div><button id='btnResetWaiter' class='btn btn-warning' type='button'>Limpiar</button></div>
                </div> 
            </div>
        </div>
    </div>
   `;

    div.innerHTML = tmp2;

    div.querySelector('#addClient').addEventListener('click', () => {
        let name = document.getElementById('name').value.trim();
        const error = div.querySelector('#msmError');
        error.innerHTML = '';
        if (name.length === 0) {
            return error.innerHTML = 'Escribe el nombre del cliente'
        }
        sessionStorage.setItem("Nombre", name);
        const nameClient = div.querySelector('#nameClient');
        nameClient.innerHTML = `Cliente : ${name}`;
        const selectbtnSubmit = document.querySelector('#submit');
        if (selectbtnSubmit) {
            name === '' ? '' : nameClient.textContent !== 'Cliente : ' ? selectbtnSubmit.removeAttribute('disabled') : selectbtnSubmit.setAttribute('disabled', true)
        };
        document.getElementById("name").value = "";

    })

    const btnBreakfast = div.querySelector('#breakfast');
    btnBreakfast.addEventListener('click', () => {
        const error = div.querySelector('#msmError');
        error.innerHTML = '';
        div.querySelector('#lunch').style.backgroundColor = "#0000";
        div.querySelector('#breakfast').style.backgroundColor = "#ffc107";
        readData('menumañana', 'Producto', (query) => {
            readWaiter(query);
            saveOrderList();
        });
    })
    const btnLunch = div.querySelector('#lunch');
    btnLunch.addEventListener('click', () => {
        const error = div.querySelector('#msmError');
        error.innerHTML = '';
        div.querySelector('#breakfast').style.backgroundColor = "#0000";
        div.querySelector('#lunch').style.backgroundColor = "#ffc107";
        readData('menutarde', 'Producto', (query) => {
            readWaiter(query);
            saveOrderList();
        });
    })
    return div;
};
