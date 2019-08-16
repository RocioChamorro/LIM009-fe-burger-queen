import { editFirestore, filterFirestore } from "../firestore.js";

const arrOrders = (arr, id) => {
    let texto = '';
    for (let i = 0; i < arr.length; i++) {
        texto += arr[i].extra ? `<p>${arr[i].quantity + ' ' + arr[i].product + ' ' + arr[i].type + ' con ' + arr[i].extra}</p><br>` :
            arr[i].type ? `<p>${arr[i].quantity + ' ' + arr[i].product + ' ' + arr[i].type}</p><br>` : `<p>${arr[i].quantity + ' ' + arr[i].product}</p><br>`;
    }
    document.getElementById(id).innerHTML = texto;
}

const editObj = (property, value, id) => {
    const objPost = {}
    objPost[property] = value
    editFirestore(id, objPost);
}

export const updatePropert = () => {
    document.querySelectorAll('.selctState').forEach(select => select.addEventListener('change', (e) => {
        editObj('state', e.target.value, e.target.dataset.select)
        if (e.target.value === 'Preparado') {
            editObj('finalDate', firebase.firestore.FieldValue.serverTimestamp(), e.target.dataset.select)
        }
    }))
}

const timeConversion = (time) => {
    if (Math.floor(time / 3600) == 0) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        let result = minutes + ":" + seconds + ' min';
        return result;
    }
    else {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        let result = hours + ":" + minutes + ":" + seconds + ' h';
        return result;
    }
}

export const readOrders = (query) => {
    const containerChef = document.querySelector('#containerChef');
    if (containerChef) {
        containerChef.innerHTML = '';
        query.forEach((doc) => {
            containerChef.innerHTML +=
                `<table class='table tableWidth'>
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Productos</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">${doc.data().name}</th>
                        <th id='order-${doc.id}'></th>
                        <td>
                        <select class='state-select selctState form-control form-control-sm' data-select="${doc.id}">
                            ${doc.data().state === 'En preparación' ?
                    `<option value = ${doc.data().state}  selected >${doc.data().state}</option>
                                <option value ='Preparado'>Preparado</option>
                                <option value ='Entregado'>Entregado</option>` :
                    doc.data().state === 'Preparado' ?
                        `<option value = ${doc.data().state}  selected >${doc.data().state}</option>
                                    <option value ='Entregado'>Entregado</option>
                                    <option value ='En preparación'>En preparación</option>` :
                        doc.data().state === 'Entregado' ?
                            `<option value = ${doc.data().state}  selected >${doc.data().state}</option>
                                        <option value ='Preparado'>Preparado</option>`
                            : ''}
                            </select>
                        </td>
                        <td id='time-${doc.id}'>
                            ${doc.data().finalDate ?
                    (doc.data().state === 'Preparado' ?
                        timeConversion(doc.data().finalDate.seconds - doc.data().createdAt.seconds) : '') : ''}  
                        </td>
                    </tr>
                </tbody>
            </table>`
            arrOrders(doc.data().order, `order-${doc.id}`);
            updatePropert();
        })
    }
}

export let unsusbcribe = null;
export const filterValueBtn = () => {
    document.querySelectorAll(".btnFilter").forEach(btn => btn.addEventListener('click', (e) => {
        if (unsusbcribe) {
            unsusbcribe()
        }
        switch (e.target.id) {
            case 'enPreparacion': {
                document.querySelector('#preparado').style.backgroundColor = "#0000";
                document.querySelector('#entregado').style.backgroundColor = "#0000";
                e.target.style.backgroundColor = "#ffc107";
                break;
            }
            case 'preparado': {
                document.querySelector('#enPreparacion').style.backgroundColor = "#0000";
                document.querySelector('#entregado').style.backgroundColor = "#0000";
                e.target.style.backgroundColor = "#ffc107";
                break;
            }
            case 'entregado': {
                document.querySelector('#enPreparacion').style.backgroundColor = "#0000";
                document.querySelector('#preparado').style.backgroundColor = "#0000";
                e.target.style.backgroundColor = "#ffc107";
                break;
            }
            default: {
                e.target.style.backgroundColor = "#ffc107";
            }
        }

        unsusbcribe = filterFirestore(e.target.value, (query) => {
            readOrders(query);
        });
    }))
}



