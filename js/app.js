//Todo lo que se muestra
class Interfaz{
    constructor(){}
    
    mostrarError(mensaje, tipo){
        const div = document.createElement('div');    
        if(tipo === 'error'){
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));
        
        let boton = document.getElementById('btn')
        boton.disabled = true;
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
            boton.disabled = false;
        }, 2000)
    }   

    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
        
            case '2':
                marca = 'Asiatico';
                break;
            
            case '3':
                marca = 'Europeo';
                break;
        }
        const div = document.createElement('div');
        // Insertar informacion
        div.innerHTML = `
        <p class="header">Aqui está tu presupuesto:</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo de seguro: ${seguro.tipo}</p>
        <p>Total: $${total}</p> 
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function () {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 1500);

        
    }
}

//Constructor para seguro
class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;

    }

    cotizarSeguro(){
        /* 
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
        */
        let cantidad;
        let total;
        const base = 2000;

        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
        
            case '2':
                cantidad = base * 1.05;
                break;

            case '3':
                cantidad = base * 1.35;
                break;
        }
        //Leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        //Cada año de diferencia se reduce un 3% el valor del seguro
        if (this.anio == new Date().getFullYear()){
            total = cantidad;

        }else{
        
            let x = 3 * diferencia;
            let descuento = (cantidad * x) / 100;
            total = cantidad - descuento;
            
        }
        /*
         Si el seguro es basico, el total se multiplica por un 30% mas
         Si el seguro es complteo, el total se multiplica por un 50% mas
        */

         if(this.tipo === 'basico'){
            total += (total * 30) / 100;
            
         }else{
            total += (total * 50) / 100;
             
         }

         return total;
    }
}

//Event listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e){
    e.preventDefault();

    //Lee la marca del Select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  
    //Lee el año seleccionado del Select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //Lee el valor del boton radial
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    //crear instancia de interfaz
    const interfaz = new Interfaz();

    if(marcaSeleccionada === ''){
        //intefaz imprimiendo error
        interfaz.mostrarError('Faltan datos, revise el formulario e intente de nuevo', 'error');

    }else{
        //Limpiar resultados
        const resultado =document.querySelector('#resultado div');
        if (resultado != null){
            resultado.remove()
        }

        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();

        //Mostrar los resultados
        interfaz.mostrarResultado(seguro, cantidad);

    }

})




//Lista los ultimos 20 años para la cotización de vehiculos
const max = new Date().getFullYear();
      min = max - 20;


const selectAnios = document.getElementById('anio');

//Agrega los años al HTML
for(i = max; i >= min; i--){
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    selectAnios.appendChild(opt);
}




