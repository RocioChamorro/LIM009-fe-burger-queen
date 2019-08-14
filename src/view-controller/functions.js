import { databaseOrder } from '../firestore.js'

export const saveOrderList = () => {
  document.querySelectorAll(".btnProduct").forEach(btn => btn.addEventListener('click', () => {
    const idBtn = btn.dataset.id;
    const arrObj = JSON.parse(sessionStorage.getItem('arrList'));
    let obj = arrObj.filter(element => {
      return element.id === idBtn;
    })
    let arrListOrder = JSON.parse(sessionStorage.getItem('arrListOrder'));
    const containerbtnTypes = document.querySelector('#containerbtnTypes');
    containerbtnTypes !== null ? containerbtnTypes.remove() : '';
    if (obj[0].type) {
      let containerbtn = document.querySelector(`#id-${idBtn}`);
      const containerbtnTypes = document.createElement('div');
      containerbtnTypes.setAttribute('id', 'containerbtnTypes');
      containerbtn.appendChild(containerbtnTypes);
      const description = document.createElement('p');
      description.textContent = 'Tipo de hamburguesa';
      containerbtnTypes.appendChild(description);

      const containerbtns = document.createElement('div');
      containerbtns.setAttribute('class', 'btnsTypes');
      obj[0].type.forEach((e) => {
        const btnType = document.createElement('button');
        btnType.setAttribute('class', 'btnType btn btn-outline-primary btn-sm');
        btnType.setAttribute('id', `btn-${e}`);
        btnType.type = 'button';
        btnType.value = e;
        btnType.textContent = e;
        containerbtns.appendChild(btnType);
        containerbtnTypes.appendChild(containerbtns);
      });
      const descriptionExtra = document.createElement('p');
      descriptionExtra.textContent = 'Extras (s/ 1 adicional)';
      containerbtnTypes.appendChild(descriptionExtra);

      const containerbtnsExtras = document.createElement('div');
      containerbtnsExtras.setAttribute('class', 'btnsExtras')
      obj[0].extra.forEach((e) => {
        const btnExtra = document.createElement('button');
        btnExtra.setAttribute('class', 'btnExtra btn btn-outline-primary btn-sm');
        btnExtra.setAttribute('id', `btn-${e}`);
        btnExtra.type = 'button';
        btnExtra.value = e;
        btnExtra.textContent = e;
        containerbtnsExtras.appendChild(btnExtra);
        containerbtnTypes.appendChild(containerbtnsExtras);
      });
      const br = document.createElement('br');
      const btnAdd = document.createElement('button');
      btnAdd.setAttribute('id', 'btnAdd');
      btnAdd.setAttribute('class', 'btn btn-warning btn-sm');
      btnAdd.type = 'button';
      btnAdd.textContent = 'Agregar';
      containerbtnTypes.appendChild(br);
      containerbtnTypes.appendChild(btnAdd);
      obj[0].type = '';
      obj[0].extra = '';


      document.querySelectorAll(".btnType").forEach(btn => btn.addEventListener('click', (e) => {
        obj[0].type = btn.value;
      
        switch (obj[0].type) {
          case 'Pollo' : {
            document.querySelector('#btn-Res').style.backgroundColor="#0000";
            document.querySelector('#btn-Vegetariana').style.backgroundColor="#0000";
            e.target.style.backgroundColor="#ffc107";
            break;
          }
          case 'Res' : {
            document.querySelector('#btn-Pollo').style.backgroundColor="#0000";
            document.querySelector('#btn-Vegetariana').style.backgroundColor="#0000";
            e.target.style.backgroundColor="#ffc107";
            break;
          }
          case 'Vegetariana' : {
            document.querySelector('#btn-Pollo').style.backgroundColor="#0000";
            document.querySelector('#btn-Res').style.backgroundColor="#0000";
            e.target.style.backgroundColor="#ffc107";
            break;
          }
          default: { 
            e.target.style.backgroundColor="#ffc107";
          }
        }
        
       
      }))
      document.querySelectorAll(".btnExtra").forEach(btn => btn.addEventListener('click', (e) => {
        obj[0].extra = btn.value;
        switch (obj[0].extra) {
          case 'Queso' : {
            document.querySelector('#btn-Huevo').style.backgroundColor="#0000";
            e.target.style.backgroundColor="#ffc107";
            break;
          }
          case 'Huevo' : {
            document.querySelector('#btn-Queso').style.backgroundColor="#0000";
            e.target.style.backgroundColor="#ffc107";
            break;
          }
          default: { 
            e.target.style.backgroundColor="#ffc107";
          }
        }
      }))
      document.querySelector('#btnAdd').addEventListener('click', () => {
        obj[0].extra === '' ? delete obj[0].extra : obj[0].price = obj[0].price + 1;
        if (obj[0].type) {
          if (arrListOrder) {
            if (arrListOrder.findIndex(e => e.type === obj[0].type && e.extra === obj[0].extra) !== -1) {
              clickCounter(arrListOrder, arrListOrder.findIndex(e => e.type === obj[0].type && e.extra === obj[0].extra)); 
            }
            else {
              arrListOrder.push(obj[0]);
              sessionStorage.setItem('arrListOrder', JSON.stringify(arrListOrder));
              printOrder();
            }
          }
          else {
            sessionStorage.setItem('arrListOrder', JSON.stringify(obj));
            printOrder();
          }
          containerbtnTypes.remove();
        }
      })
    }
    else {
      if (arrListOrder) {
        if (arrListOrder.map(e => e.id).indexOf(idBtn) !== -1) {
          clickCounter(arrListOrder, arrListOrder.map(e => e.id).indexOf(idBtn));
        }
        else {
          arrListOrder.push(obj[0]);
          sessionStorage.setItem('arrListOrder', JSON.stringify(arrListOrder));
          printOrder();
        }
      }
      else {
        sessionStorage.setItem('arrListOrder', JSON.stringify(obj));
        printOrder();
      }
    }
  }))
}

export const printOrder = () => {
  const nameClient = document.getElementById('nameClient');
  const printName = sessionStorage.getItem("Nombre");
  nameClient.innerHTML = `Cliente : ${printName ? printName : ''}`;
  let arrListOrder = JSON.parse(sessionStorage.getItem('arrListOrder'));
  const tbody = document.querySelector('#tableOrder tbody');
  const tfoot = document.querySelector("#total");
  const blockSubmit = document.querySelector("#blockSubmit")
  const selectbtnSubmit = document.querySelector('#submit');
  selectbtnSubmit !== null ? selectbtnSubmit.remove() : '';
  tbody.innerHTML = '';
  tfoot.innerHTML = 's/ 0.00';
  let total = 0;
  if (arrListOrder) {
    for (let i = 0; i < arrListOrder.length; i++) {
      let row = tbody.insertRow(i);
      row.setAttribute('class', 'tableRow');
      let productCell = row.insertCell(0);
      let priceCell = row.insertCell(1);
      let counterCell = row.insertCell(2);
      const newDiv=document.createElement('div');
      newDiv.className='newDiw';
      let removeCell = row.insertCell(3);
      productCell.innerHTML = arrListOrder[i].extra !== undefined ? arrListOrder[i].product + ' ' + arrListOrder[i].type + ' con ' + arrListOrder[i].extra : arrListOrder[i].type !== undefined ? arrListOrder[i].product + ' ' + arrListOrder[i].type : arrListOrder[i].product;

      priceCell.innerHTML = `s/ ${arrListOrder[i].price}.00`;

      total += Number(arrListOrder[i].price);
      tfoot.innerHTML = `s/ ${total}.00`;

      const quantityP = document.createElement('p');
      quantityP.setAttribute('id', `quantity-${arrListOrder[i].id}`)
      quantityP.setAttribute('data-id', `${arrListOrder[i].id}`)
      quantityP.className = 'quantity';
      quantityP.textContent = arrListOrder[i].quantity;

      const btnSubtra = document.createElement('button');
      btnSubtra.setAttribute('data-id', `${arrListOrder[i].id}`)
      btnSubtra.setAttribute('data-i', `${i}`)
      btnSubtra.className = 'subtra fas fa-minus btn btn-outline-danger btn-sm';
      btnSubtra.type = 'button';

      const btnSum = document.createElement('button');
      btnSum.setAttribute('data-id', `${arrListOrder[i].id}`);
      btnSum.setAttribute('data-i', `${i}`);
      btnSum.className = 'sum fas fa-plus btn btn-outline-primary btn-sm'; 
      btnSum.type = 'button';
      
      counterCell.appendChild(newDiv);
      newDiv.className = 'CellBtns';
      newDiv.appendChild(quantityP);
      newDiv.appendChild(btnSum);
      newDiv.appendChild(btnSubtra);

      const btnRemove = document.createElement('button');
      btnRemove.setAttribute('class', 'remove');
      btnRemove.className += ' btn btn-danger';

      btnRemove.setAttribute('data-id', `${arrListOrder[i].id}`);
      btnRemove.setAttribute('data-i', `${i}`);
      btnRemove.innerHTML = `<i class="fas fa-trash-alt"></i>`;
      btnRemove.type = 'button';

      removeCell.appendChild(btnRemove);
    }
    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('id', 'submit');
    btnSubmit.setAttribute('class', 'btn btn-warning');
    btnSubmit.setAttribute('type', 'button');
    btnSubmit.textContent = 'Enviar a cocina';
    blockSubmit.appendChild(btnSubmit);
    sum(arrListOrder);
    subtra(arrListOrder);
    removeCell(arrListOrder);
    sendOrder(arrListOrder);
  }
}

const sum = (arrObj) => {
  document.querySelectorAll(".sum").forEach(btn => btn.addEventListener('click', () => {

    let obj = arrObj[btn.dataset.i];
    const valueQuant = obj.quantity;
    let newValueQuant = valueQuant + 1;
    obj.quantity = newValueQuant;
    const valuePrice = obj.price;
    let newValuePrice = valuePrice + (valuePrice / valueQuant);
    obj.price = newValuePrice;
    sessionStorage.setItem('arrListOrder', JSON.stringify(arrObj));
    printOrder();
  })
  )
}

const subtra = (arrObj) => {
  const btnSubmit = document.querySelector('#submit');
  document.querySelectorAll(".subtra").forEach(btn => btn.addEventListener('click', () => {
    let i = btn.dataset.i;
    let obj = arrObj[i];
    const valueQuant = obj.quantity;
    let newValueQuant = valueQuant - 1;
    obj.quantity = newValueQuant;
    if (obj.quantity === 0) {
      arrObj.splice(i, 1);
      sessionStorage.setItem('arrListOrder', JSON.stringify(arrObj));
      printOrder();
    }
    else {
      const valuePrice = obj.price;
      let newValuePrice = valuePrice - (valuePrice / valueQuant);
      obj.price = newValuePrice;
      sessionStorage.setItem('arrListOrder', JSON.stringify(arrObj));
      printOrder();
    }
  }))
  arrObj.length === 0 ? (sessionStorage.removeItem('arrListOrder'),
    btnSubmit.remove()) : ('');
}

const removeCell = (arrObj) => {
  document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click', () => {
    let i = btn.dataset.i;
    arrObj.splice(i, 1);
    sessionStorage.setItem('arrListOrder', JSON.stringify(arrObj))
    printOrder();
  }))
}

const clickCounter = (arr, i) => {
  let obj = arr[i];
  const valueQuant = obj.quantity;
  let newValueQuant = valueQuant + 1;
  obj.quantity = newValueQuant;
  const valuePrice = obj.price;
  let newValuePrice = valuePrice + (valuePrice / valueQuant);
  obj.price = newValuePrice;
  sessionStorage.setItem('arrListOrder', JSON.stringify(arr));
  printOrder(); 
}


export const readWaiter = (query) => {
  const container = document.getElementById('containerWaiter');
  let arrList = [];
  container.innerHTML = "";
  query.forEach((doc) => {
    const obj = {
      id: doc.id,
      product: doc.data().Producto,
      price: doc.data().Precio,
      image: doc.data().Imagen,
      type: doc.data().tipo,
      extra: doc.data().adicional,
      quantity: 1,
      get producprecio() {
        return `<img class="card-img-top" src="${this.image}">` + `<div class='card-divtext'><p class='card-text text-black'>${this.product} <br>s/ ${this.price}.00</p></div>`;
      }
    }
    arrList.push(obj);
    const containerbtn = document.createElement('div');
    containerbtn.className = 'divBtnProduct';
    /* containerbtn.className += ' card'; */
    containerbtn.setAttribute('id', `id-${obj.id}`);
    containerbtn.setAttribute('data-id', `${obj.id}`);
    const btnProduct = document.createElement('button');
    btnProduct.setAttribute('class', 'btnProduct');
    /* btnProduct.setAttribute('class', 'card'); */
    btnProduct.className += ' card'; 
    btnProduct.setAttribute('data-id', `${obj.id}`);
    btnProduct.setAttribute('data-price', `${obj.price}`);
    btnProduct.innerHTML = obj.producprecio;
    containerbtn.appendChild(btnProduct);
    container.appendChild(containerbtn);
  })
  sessionStorage.setItem('arrList', JSON.stringify(arrList));
}

const sendOrder = (arrObj) => {
  const selectbtnSubmit = document.querySelector('#submit');
  const nameClient = document.getElementById('nameClient');

  if (selectbtnSubmit) {
    selectbtnSubmit.addEventListener('click', () => {
      let nombre = sessionStorage.getItem('Nombre')
      const obj = {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        finalDate: firebase.firestore.FieldValue.serverTimestamp(),
        name: nombre,
        order: arrObj,
        state: 'En preparación'
      }
      databaseOrder(obj);
      sessionStorage.removeItem('Nombre');
      sessionStorage.removeItem('arrListOrder');
      nameClient.innerHTML = '';
      printOrder();
    })
  }
}

export const resetWaiter = () => {
  const btnReset = document.querySelector('#btnResetWaiter');
  btnReset.addEventListener('click', () => {
    const nameClient = document.getElementById('nameClient');
    sessionStorage.removeItem('Nombre');
    sessionStorage.removeItem('arrListOrder');
    nameClient.innerHTML = '';
    printOrder();
  })
}