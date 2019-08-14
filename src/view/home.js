import {changehash} from '../view-controller/routes.js'

export default () => {
  const div = document.createElement('div');
  div.className="home";
  const tmp1 = `
  <div class="opacity">
    <img class="imgLogo" src="../images/logo.png" alt="logo">
    <div class="containerHomeBtn">
     
      <button id="btnMesero" class='btn btn-warning'>MESERO</button></a>
     
      <button id="btnCocinero" class='btn btn-warning'>COCINERO</button></a>
    </div>
  </div>`;

  div.innerHTML = tmp1;
  const btnMesero = div.querySelector('#btnMesero');
  btnMesero.addEventListener('click', () => {
    changehash('#/waiter');
  })
  const btnCocinero = div.querySelector('#btnCocinero');
  btnCocinero.addEventListener('click', () => {
    changehash('#/chef');
  })
  return div;
};

{/* <a class="btnsHome" href="#/waiter"><img class="mainImage" src="https://image.flaticon.com/icons/svg/1919/1919720.svg">
<a class="btnsHome" href="#/chef"><img class="mainImage" src="https://image.flaticon.com/icons/svg/1912/1912332.svg"> */}