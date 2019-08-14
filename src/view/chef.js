export default () => {
    const div = document.createElement('div');
    const tmp3 = `<header class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
        <img class="imgLogo" src="../images/logoHeader.png" width="70" height="30" class="d-inline-block align-top" alt="logo">
            Burger Queen
        </a>
        <a class='btn btn-outline-warning btn-sm' href='#/waiter'>Hacer pedido</a>
    </header>
    <div class="btnsFilter">
        <button class='btnFilter btn btn-warning' type='button' value='En preparación'>En preparación</button>
        <button class='btnFilter btn btn-warning' type='button' value='Preparado'>Preparado</button>
        <button class='btnFilter btn btn-warning' type='button' value='Entregado'>Entregado</button>
    </div>
    <div id='containerChef'></div>
    `
    div.innerHTML = tmp3;
    return div;  
};

