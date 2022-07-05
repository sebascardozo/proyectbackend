const Contenedor = require('./container/container')

const servicioProductos = new Contenedor();


const agregar = async() =>{
    console.log("Producto Agregado")
    let producto = {
        title: "Filamento Pla",
        prices: "1.200",
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_954549-MLA46371004734_062021-F.webp"
    }
    await servicioProductos.save(producto)
}

const mostrarLista = async() =>{
    let lista = await servicioProductos.getAll();
    console.log(lista)
}

//PRUEBAS (DESCOMENTAR PARA USAR)

//mostrarLista()
agregar();
//servicioProductos.deleteById(1)
//servicioProductos.deleteAll()
//servicioProductos.getById(2)