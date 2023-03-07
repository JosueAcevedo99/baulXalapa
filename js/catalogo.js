

const dataBaseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjgXTjtZCnlVM2ESGxnUKh6Y1RJDndriL_Yz0vVm-EVrf-4FxkF30nmR9YQerO5_OIe6BkfKUh2zqN/pub?gid=0&single=true&output=csv';


let dataBase = null;

async function cargarDatos() {
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
        cargarCatalogo();

        

        
      }).catch(error => console.error(error))
}

window.addEventListener('load', cargarDatos);


const cargarCatalogo = async () => {


    const container = document.querySelector('#portafolio');
    let contentHTML = '';

        for (let i = 0; i < dataBase.length; i++) {
          const obj = dataBase[i]
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
        }
    container.innerHTML = contentHTML;
}
  
async function categoria(categoria) {


    const container = document.querySelector('#portafolio');
    let contentHTML = '';
    if(categoria == "todo"){
      for (let i = 0; i < dataBase.length; i++) {
          const obj = dataBase[i]
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

        
      }
    }

        for (let i = 0; i < dataBase.length; i++) {
          if(dataBase[i].categoria == categoria){
            const obj = dataBase[i]
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
  
          }
        }
    container.innerHTML = contentHTML;
}
