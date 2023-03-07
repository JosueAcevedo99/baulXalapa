





const cargarCatalogo = async () => {

    const container = document.querySelector('#portafolio');
    let contentHTML = '';

  
    await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSjgXTjtZCnlVM2ESGxnUKh6Y1RJDndriL_Yz0vVm-EVrf-4FxkF30nmR9YQerO5_OIe6BkfKUh2zqN/pub?gid=0&single=true&output=csv')
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
        const data2 = JSON.parse(jsonData)
        for (let i = 0; i < data2.length; i++) {
          const obj = data2[i]
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
      })
      .catch(error => console.error(error))
    container.innerHTML = contentHTML;
  }
  
  cargarCatalogo();
  
  
