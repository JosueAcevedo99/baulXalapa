const dataBaseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQdRpOu3nfDuDUZXLjugL1jxR306487fkr1ssTk37EWgaf_8lKCYEh9qhmkyuUKtZVPAiUqdx0urs-4/pub?gid=0&single=true&output=csv';

const header = document.querySelector("#header");
const firstBanner1 = document.querySelector(".banner-text-1-1");
const firstBanner2 = document.querySelector(".banner-text-1-2");
const secondtBanner1 = document.querySelector(".banner-text-2-1");
const secondtBanner2 = document.querySelector(".banner-text-2-2");



var dataBase = [];

const cargarDatos = async () => {
    await fetch(dataBaseUrl)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n')
        const headers = lines[0].split(',')
        const result = []
  
        for (let i = 1; i < lines.length; i++) {
          const obj = {}
          const currentLine = lines[i].split(',')
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j]
          }
          result.push(obj)
        }
  
        const jsonData = JSON.stringify(result)
        dataBase = JSON.parse(jsonData)

        
      }).catch(error => console.error(error))
}


const cargarBanner = async () => {
    await cargarDatos();
        for (let i = 0; i < 5; i++) {
          const obj = dataBase[i]
          if(i == 0){
            header.style.background = 'url('+ obj.Img + ') top/cover no-repeat';
          }
          if(i == 1){
            firstBanner1.textContent = obj.Img;
          }
          if(i == 2){
            firstBanner2.textContent = obj.Img;
          }
          if(i == 3){
            secondtBanner1.textContent = obj.Img;
          }
          if(i == 4){
            secondtBanner2.textContent = obj.Img;
          }
          
        
        }
}

var numNovedades = 5;

const cargarCatalogo = async () => {

    await cargarBanner();
    const container = document.querySelector('#portafolio');
    let contentHTML = '';
    var bandera = true;
    var contador = 5;
    
        while(bandera){
            const obj = dataBase[contador]
          const image = obj.Img;
          const tittle = obj.Producto;
          const precio = obj.Precio;
          const vinculo = obj.vinculo;
  
          contentHTML += `
                <div class="col-md-4 text-center mt-3 my-2">
                      <img src="${image}" class="img-thumbnail imgCatalogo">
                      <h5 class="title mt-3"> ${tittle}</h5>
                      <h5 class="title mt-3">$ ${precio}</h5>
                      <a href="${vinculo}" target="_blank" class="btn btn-outline-light btnImprimirCatalogo" >Ver más</a>
  
                </div>`;

                
            if(dataBase[contador+1].Producto == "novedades"){
            bandera = false;
            }else{
                contador++;
                numNovedades ++;
            }
        }


    container.innerHTML = contentHTML;
}
  
var numConocenos = numNovedades+2;

const cargarNovedades= async () => {

    await cargarCatalogo();
    const container = document.querySelector('#novedadesPrendas');
    let contentHTML = '';

    var bandera2 = true;
    var contador2 = numNovedades+2;
    while(bandera2){
        const obj = dataBase[contador2]
      const image = obj.Img;
      const tittle = obj.Producto;
      const precio = obj.Precio;
      const vinculo = obj.vinculo;

      contentHTML += `
            <div class="col-md-4 text-center mt-3 my-2">
                  <img src="${image}" class="img-thumbnail imgCatalogo">
                  <h5 class="title mt-3"> ${tittle}</h5>
                  <h5 class="title mt-3">$ ${precio}</h5>
                  <a href="${vinculo}" target="_blank" class="btn btn-outline-light btnImprimirCatalogo" >Ver más</a>

            </div>`;

            
        if(dataBase[contador2+1].Producto == "conocenos"){
        bandera2 = false;
        }else{
            contador2++;
            numConocenos ++;
        }
    }


    container.innerHTML = contentHTML;
}

  

const cargarConocenos= async () => {

    await cargarNovedades();
    const container = document.querySelector('#conocenosExcel');
    let contentHTML = '';

    for(let k = dataBase.length-1; k >-1; k--){
      const obj = dataBase[k]
      if(obj.Producto == "conocenos"){
        break;
      }
      const image = obj.Img;
      const tittle = obj.Producto;
      const precio = obj.Precio;
      const vinculo = obj.vinculo;

      contentHTML += `
            <div class="col-md-4 text-center mt-3 my-2">
                  <img src="${image}" class="img-thumbnail imgCatalogo">
                  <h5 class="title mt-3"> ${tittle}</h5>
                  <h5 class="title mt-3"> ${precio}</h5>
                  <a href="${vinculo}" target="_blank" class="btn btn-outline-light btnImprimirCatalogo" >Ver más</a>

            </div>`;

    }


    container.innerHTML = contentHTML;
}

cargarConocenos();