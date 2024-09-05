class Sistema {
    constructor(){     
       this.usuarios = new Array()
       this.administradores = new Array()
       this.instancias = new Array()
       this.logueado  = new Array()
       this.alquileres  = new Array()
    }

    //OBTENER ID_INSTANCIA 

    AgregarIdInstancia(pInstancia) {
        return `INSTANCE_ID_${pInstancia}`
    }

    obtenerIdInstancia(pInstancia) {
        return pInstancia.substring(12,pInstancia.length)
    }

    // BUSCA POSICION ELEMENTO - Te devuelve la posicion del elemento deseado

    buscarPosicionElemento(pLista,pDato,pAtributo){
        for (let index = 0; index < pLista.length; index++) {
            let datoAux = pLista[index][pAtributo]
            if (pDato === datoAux){
                return index;
            }
        }
        return -1
    }
    
    // BUSCA  ELEMENTO - Te devuelve el elemento del elemento deseado

    buscarElemento(pLista,pDato,pAtributo){
        let elementoX = null;
        let posX = 0;
        while (elementoX === null && posX < pLista.length) {
            let elementoLista = pLista[posX]
            let elementoEnLista = pLista[posX][pAtributo]
            if (pDato === elementoEnLista) {
                elementoX = elementoLista;
            }
            posX++;
        }
        return elementoX;
    }

    buscarUsuario(pLista,pDato,pAtributo){
        let elementoX = null;
        let posX = 0;
        while (elementoX === null && posX < pLista.length) {
            let elementoLista = pLista[posX]
            let elementoEnLista = pLista[posX][pAtributo]
            if (pDato.toLowerCase() === elementoEnLista.toLowerCase()) {
                elementoX = elementoLista;
            }
            posX++;
        }
        return elementoX;
    }

    // CERRAR SESION 

    cerrarSesion(){
        let cerrada = false;
        this.logueado.pop();
        if(this.logueado === null){
            cerrada = true;
        }
        return cerrada;
    }

    // VALIDACIONES NUMERO 

    validarNro(Numero) {
        return !isNaN(Numero)
    }

    // VALIDACIONES LOGIN - USUARIOS/ADMINISTRADOR 

    validacionesLogin(pUsuario,pContrasenia,pTipoUsuario){
        let ok = true
        if (pUsuario === '' || pContrasenia === ''){
            ok = false
        }else if (pTipoUsuario !=='usuarios' && pTipoUsuario !=='administradores'){
            ok = false
        }
        return ok
    }

    // VALIDACIONES REGISTRO - USUARIOS/ADMIN

    validacionesRegistroUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido,pTipoUsuario,pEstado,pNrotarjeta,pCvc){
        return this.validarNombreUnico(pNombreUsuario) && this.validarContrasenia(pContrasenia) && this.validarTarjeta(pNrotarjeta) && this.validacionesLogin(pNombre, pApellido,pTipoUsuario) && this.validacionCVC(pCvc)
    }

    validacionesRegistroAdmin(pNombreUsuario,pContrasenia,pTipoUsuario){
        return this.validarNombreUnico(pNombreUsuario) && this.validarContrasenia(pContrasenia) && this.validacionesLogin(pNombreUsuario,pContrasenia,pTipoUsuario)
    }

    // VALIDACIONES CVC 

    validacionCVC(pCvc){
        return !isNaN(pCvc) && pCvc.length === 3
    }

    // VALIDACIONES STOCK - INSTANCIA

    validarStockInstancia(pInstancia,pdiferencia) {

        return Number(pdiferencia) >= Number(this.VerificarStockAlquileres(pInstancia.idInstancia));
    }
    
    // VALIDACIONES STOCK - INSTANCIA A ALQUILAR

    validarStockInstanciaAlquilar(pInstancia,pdiferencia) {
        return Number(pdiferencia) <= Number(pInstancia.stock) - Number(this.VerificarStockAlquileres(pInstancia.idInstancia));
    }

    // VALIDACIONES NOMBRE UNICO - Valida que el nombre de usuario sea unico

    validarNombreUnico(pNombre) {
        let validarNombre = this.validarNombre(pNombre);
        let unico = this.buscarElemento(this.usuarios,pNombre,'nombre') === null;
        return validarNombre && unico;
    }

    // VALIDACIONES NOMBRE - Valida que el nombre tenga el formato esperado

    validarNombre(pNombre){
        let validarNombre = pNombre.trim().length > 3 && pNombre.trim().charAt(0) === pNombre.trim().toUpperCase().charAt(0);
        return validarNombre;
    }

    // VALIDACIONES CONTRASEÑA - Valida que la contraseña tenga el formato esperado

    validarContrasenia(pContrasenia){
        let okMayusculas = false
        let okMinusculas = false
        let okNumero = false
        for (let index = 0; index < pContrasenia.length; index++) {
            let caracter = pContrasenia.charAt(index)
            if (!isNaN(caracter)){
                okNumero = true
            }else if (caracter === caracter.toUpperCase()){
                okMayusculas = true
            }else if (caracter === caracter.toLowerCase()){
                okMinusculas = true
            }
        }
        let validarContrasenia = pContrasenia.trim().length >= 5 && okMinusculas && okMayusculas && okNumero
        return validarContrasenia
    }

    // VALIDACIONES INSTANCIA - Valida que la instancia se una de las esperadas

    validarInstancia( pTipo, pOptimizacion, pTamanio, pPrecioEncendido, pPrecioAlquiler, pStock){
        let tipoOk= true;
        let tamanioOk= true;
        let optimizacionOk= true;
        let numeroOk= true; 

        if(pTipo !== "c7" && pTipo !== "r7" && pTipo !== "i7"){
            tipoOk= false;
        }

        if(pTipo === "r7"){
            if(pTamanio !== "medium" && pTamanio !== "large"){
                tamanioOk= false;
            }
        }else if(pTamanio !== "small" && pTamanio !== "medium" && pTamanio !== "large"){
            tamanioOk= false;
        }
            
        if(pOptimizacion !== "computo" && pOptimizacion !== "memoria" && pOptimizacion !== "almacenamiento"){
            optimizacionOk= false;
        }
        if(isNaN(pPrecioEncendido) || isNaN(pPrecioAlquiler) || isNaN(pStock)){
            numeroOk= false;

        }
        return tipoOk && tamanioOk && optimizacionOk && numeroOk;
    }

    // VALIDACION ESTADO - Valida que el usuario este habilitado

    validacionEstado(pUsuario){
        let ok = true
        let usuEncontrado = this.buscarUsuario(this.usuarios,pUsuario,'nombreUsuario')
        if (usuEncontrado.estado !== 'habilitado') {
            ok = false
        }
        return ok
    }


    // ------ METODO - LOGIN ------

    login(pUsuario,pContrasenia,pTipoUsuario) {
        let ok = false;
        let usuEncontrado = null
        if (this.validacionesLogin(pUsuario,pContrasenia,pTipoUsuario)) { //Validacion de datos
            if (pTipoUsuario === 'usuarios') {
                usuEncontrado = this.buscarUsuario(this.usuarios,pUsuario,'nombreUsuario')
            }else{
                usuEncontrado = this.buscarUsuario(this.administradores,pUsuario,'nombreUsuario')
            }
            if(usuEncontrado !== null){
                if(usuEncontrado.contrasenia === pContrasenia){
                    this.logueado.push(usuEncontrado);
                    ok = true;
                }
            }
            return ok;
        }

    }

    // VERIFICAR STOCK - Verifica la cantidad de maquinas alquilas de dichas instancia

    VerificarStockAlquileres(pInstanciaId){
        let cantAlquileres = 0
        for (let i = 0; i < this.alquileres.length; i++) {
            let alquilerX = this.alquileres[i];
            if (alquilerX.Instancia.idInstancia === pInstanciaId){ 
                cantAlquileres++;
            }
        }
        return cantAlquileres;
    }

    // MODIFICAR STOCK - Realiza el proceso de la modificación de stock de dicha instancia

    modificarStock(pInstanciaId, pUsuarioId, pCant) {
        let modificada = false;
        let instanciaX = this.buscarElemento(this.instancias,pInstanciaId,'idInstancia');

        let usuarioX = this.logueado[pUsuarioId].idUsuario
        if (instanciaX !== null && usuarioX !== null && this.validarNro(pCant) && Number(pCant) > 0) {
            if (pCant > this.VerificarStockAlquileres(pInstanciaId)) {
                if (this.actualizarStock(instanciaX, Number(pCant))) {
                    instanciaX.stock = Number(pCant);
                    modificada = true;
                }
            }
        }
        return modificada;
    }

    // ACTUALIZAR STOCK - Actualiza el stock de la instancia seleccionada

    actualizarStock(pInstancia, pCantNueva) {
        let ok = false;
        let cantAnterior = pInstancia.stock;
        let diferencia = cantAnterior - pCantNueva;
        if (diferencia > 0) {
            //se devuelven peliculas
            pInstancia.stock =pInstancia.stock + diferencia;
            ok = true;
        }
        if (diferencia < 0) {
             //se venden nuevas peliculas
            diferencia = diferencia * -1;
            if (this.validarStockInstancia(pInstancia,diferencia)) {
                pInstancia.stock = pInstancia.stock - diferencia;
                ok = true;
            }
        }
        if(diferencia ===0) ok = true;
        return ok;

    }

    // ENCENDER/APAGAR INSTANCIA - Cambia el estado de la instancia alquilada

    encendidoInstancia(pIdAlquiler){
        let anulada = false;
        let elAlquiler = this.buscarElemento(this.alquileres,pIdAlquiler,'idAlquiler');
        if (elAlquiler !== null) {
            if (elAlquiler.estado === "encendido"){
                elAlquiler.estado = "apagado";
            }else if (elAlquiler.estado === "apagado"){
                elAlquiler.estado = "encendido";
                elAlquiler.cantInicio += 1
            }
            anulada = true;
        }
        return anulada;
    }

    borrarElementoDelArray(pLista, pElemento) {
        let i = 0;
        let posX = -1;
        while (posX === -1 && i < pLista.length) { //debo encontrar la posici'on del elemento que quiero borrar
            let eleX = pLista[i];
            if (eleX === pElemento) {
                posX = i;
            }
            i++;
        }
        if (posX != -1) { //elimino 1 elemento en esa posiciòn.
            let anecdotico = pLista.splice(posX, 1);  //devuele 'el o los elementos elminados
        }
        return posX != -1; //es que se encontró y se borró
    }

    //ELIMINAR ALQUILERES

    eliminarAlquileres(pUsuario){
        for (let i = 0; i < this.alquileres.length; i++) {
            let alquilerX = this.alquileres[i];
            if (pUsuario.idUsuario === alquilerX.Usuario.idUsuario) {
                this.borrarElementoDelArray(this.alquileres, alquilerX)
            }
        }
    }

    // APROBACION DE USUARIO - Cambia el estado del usuario 

    AprobacionUsuarios(pIdUsuario){
        let anulada = false;
        let elUsuario = this.buscarElemento(this.usuarios,pIdUsuario,'idUsuario');
        if (elUsuario !== null) {
            if (elUsuario.estado === "pendiente"){
                elUsuario.estado = "habilitado";
            }else if (elUsuario.estado === "bloqueado"){
                elUsuario.estado = "habilitado";
            }else if (elUsuario.estado === "habilitado"){
                elUsuario.estado = "bloqueado";
                this.eliminarAlquileres(elUsuario)
            }
            anulada = true;
        }
        return anulada;
    }
    
    //AGREGAR INSTANCIA - Carga los datos de la instancia

    agregarInstancia( pTipo, pOptimizacion, pTamanio, pPrecioEncendido, pPrecioAlquiler, pStock){
        let agregada = false;
        let instanciaX = new Instancia();
        if(this.validarInstancia( pTipo, pOptimizacion, pTamanio, pPrecioEncendido, pPrecioAlquiler, pStock)){
            instanciaX.tipo= pTipo;
            instanciaX.optimizacion= pOptimizacion;
            instanciaX.tamanio= pTamanio;
            instanciaX.precioEncendido= pPrecioEncendido;
            instanciaX.precioAlquiler= pPrecioAlquiler;
            instanciaX.stock= pStock; 
            this.instancias.push(instanciaX);
            agregada= true;
        }
       
        return agregada;
    }

    //AGREGAR ADMINISTRADOR - Carga los datos del administrador

    agregarAdmin(pNombreUsuario,pContrasenia,pTipoUsuario){
        let agregada = false;
        let adminX = new Administradores();
        if (this.validacionesRegistroAdmin(pNombreUsuario,pContrasenia,pTipoUsuario)){
            adminX.nombreUsuario = pNombreUsuario;
            adminX.contrasenia = pContrasenia;
            adminX.tipoUsuario = pTipoUsuario;
            this.administradores.push(adminX);
            agregada = true;
        }
        return agregada;
    }

    //AGREGAR USUARIO -  Carga los datos del usuario

    agregarUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido,pTipoUsuario,pEstado,pNrotarjeta,pCvc){
        let agregada = false;
        let usuarioX = new Usuarios();
        if (this.validacionesRegistroUsuario(pNombreUsuario, pContrasenia, pNombre, pApellido,pTipoUsuario,pEstado,pNrotarjeta,pCvc)){
            usuarioX.nombre = pNombre;     
            usuarioX.apellido = pApellido; 
            usuarioX.nombreUsuario = pNombreUsuario;
            usuarioX.contrasenia = pContrasenia;
            usuarioX.tipoUsuario = pTipoUsuario;
            usuarioX.estado = pEstado;   
            usuarioX.nrotarjeta = pNrotarjeta;
            usuarioX.cvc = pCvc;
            this.usuarios.push(usuarioX);
            agregada = true;
        }
        return agregada;
    }

    // AGREGAR ALQUILER INSTANCIA - Realiza el alquiler de la instancia correspondiente

    agregarAlquilerInstancia(pInstanciaId,pUsuario,pEstado,pCantInicio) {
        let agregada = false;
        let instanciaX = this.buscarElemento(this.instancias,pInstanciaId,'idInstancia');
        let usuarioX = pUsuario
        if (this.validarStockInstanciaAlquilar(instanciaX,1)) {
            if (instanciaX !== null && usuarioX !== null) {
                if (pEstado === 'encendido' || pEstado === 'apagado') {
                    let unAlquiler = new Alquiler();
                    unAlquiler.Usuario = usuarioX;
                    unAlquiler.Instancia = instanciaX;
                    unAlquiler.estado = pEstado
                    unAlquiler.cantInicio = pCantInicio;
                    this.alquileres.push(unAlquiler);
                    agregada = true;
                }
            }
        }
        return agregada;
    }

    // OBTENER TABLAS - INSTANCIAS ALQUILER

    obtenerTablaInstanciasAlquilar(){
        let tabla = `<table border="1"><tr><th>ID</th><th>Tipo</th><th>Tamaño</th><th>Optimizacion</th><th>Stock</th><th>Precio alquiler</th><th>Precio encendido</th></tr>`;
        for (let i = 0; i < this.instancias.length; i++) {
            let instanciaX = this.instancias[i];
            let instanciaId = this.obtenerIdInstancia(instanciaX.idInstancia)
            let filaX = `<tr><td>${instanciaId}</td><td>${instanciaX.tipo}</td><td>${instanciaX.tamanio}</td><td>${instanciaX.optimizacion}</td>
                <td>${Number(instanciaX.stock) - Number(this.VerificarStockAlquileres(instanciaX.idInstancia))}</td><td>U$S ${instanciaX.precioAlquiler}</td><td>U$S ${instanciaX.precioEncendido}</td></tr>`;
            tabla += filaX;

        }
        tabla += `</table>`; //cierro tabla
        return tabla;
    }

    // OBTENER TABLAS - MAQUINAS ALQUILDAS

    obtenerTablaMaquinaAlquilada(pEstado){
        let tabla = `<table border="1"><tr><th>Instancia</th><th>Estado</th><th>Veces iniciada</th><th>Accion</th></tr>`;
        let usuarioLogueado = this.logueado[0]
        let estadoAux = pEstado
        for (let i = 0; i < this.alquileres.length; i++) {
            let alquilerX = this.alquileres[i];
            if (usuarioLogueado.idUsuario === alquilerX.Usuario.idUsuario) {
                if (pEstado === 'todos') {
                    estadoAux = alquilerX.estado
                }
                if (estadoAux === alquilerX.estado) { //ENCENDIDO Y APAGADO
                    let botonEstado = ''
                    if (alquilerX.estado === 'encendido'){
                        botonEstado = 'Apagar'
                    }else{
                        botonEstado = 'Encender'
                    }
                    let filaX = `<tr><td>${alquilerX.Instancia.tipo}.${alquilerX.Instancia.tamanio}</td><td>${alquilerX.estado}</td><td>${alquilerX.cantInicio}</td>
                        <td><input type="button" value=${botonEstado} class="botonesModificarEstado" AlquilerSeleccionada="${alquilerX.idAlquiler}"/></td></tr>`;
                    tabla += filaX;
                }
            }
        }

        tabla += `</table>`; //cierro tabla
        return tabla;
    }

        // OBTENER TABLAS - COSTO TOTAL

        obtenerTablaCostoTotal(){ // COSTO TOTAL = COSTO ALQUILER * CANT MAQUINAS ALQUIDAS MISMO ID + COSTO POR ENCENDIDO * VECES ENCENDIDAS-CANTIDA DE MAQUINAS ALQUILADAS MISMO ID
            let tabla = `<table border="1"><tr><th>Tipo de instancia</th><th>Costo por encendido</th><th>Total de veces iniciada</th><th>Costo total</th></tr>`;
            let usuarioLogueado = this.logueado[0]
            let alquilerX
            let filaX
            for (let i = 0; i < this.instancias.length; i++) {
                let instanciaX = this.instancias[i];
                let CantInicioAlquiler = 0
                let CostoTotal = 0
                let flagAlquiler = false 
                for (let i = 0; i < this.alquileres.length; i++) {
                    alquilerX = this.alquileres[i];
                    if (usuarioLogueado.idUsuario === alquilerX.Usuario.idUsuario) {
                        if (instanciaX.idInstancia === alquilerX.Instancia.idInstancia) {     
                            flagAlquiler = true           
                            CantInicioAlquiler += alquilerX.cantInicio
                            CostoTotal+= alquilerX.Instancia.precioAlquiler + alquilerX.Instancia.precioEncendido * (alquilerX.cantInicio-1)
                            filaX = `<tr><td>${alquilerX.Instancia.tipo}.${alquilerX.Instancia.tamanio}</td><td> U$S ${alquilerX.Instancia.precioEncendido}</td><td>${CantInicioAlquiler}</td><td> U$S ${CostoTotal}</td></tr>`;
                        }
                    }
                }
                if (flagAlquiler){
                    tabla += filaX;
                }
            }
            tabla += `</table>`; //cierro tabla
            return tabla;
        }

        // OBTENER TABLAS - COSTO TOTAL

        obtenerTablaInformeInstancias(){
            let tabla = `<table border="1"><tr><th>Tipo de instancia</th><th>Cantidad</th><th>Ingreso total</th></tr>`;
            let alquilerX
            let filaX
            let Total = 0
            for (let i = 0; i < this.instancias.length; i++) {
                let instanciaX = this.instancias[i];
                let CantInicioAlquiler = 0
                let CostoTotal = 0
                let cantidad = 0
                let flagAlquiler = false 
                for (let i = 0; i < this.alquileres.length; i++) {
                    alquilerX = this.alquileres[i];
                    if (instanciaX.idInstancia === alquilerX.Instancia.idInstancia) {     
                        flagAlquiler = true     
                        CantInicioAlquiler += alquilerX.cantInicio
                        CostoTotal+= alquilerX.Instancia.precioAlquiler + alquilerX.Instancia.precioEncendido * (alquilerX.cantInicio-1)
                        cantidad++
                        filaX = `<tr><td>${alquilerX.Instancia.tipo}.${alquilerX.Instancia.tamanio}</td><td>${cantidad}</td><td> U$S ${CostoTotal}</td></tr>`;
                    }
                }
                Total += CostoTotal
                if (flagAlquiler){
                    tabla += filaX;
                }
            }
            tabla += `</table> <p id="pF08InformeMaquinas">El ingreso total es: ${Total}</p>`; //cierro tabla
            return tabla;
        }

    // OBTENER TABLAS - USUARIO

    obtenerTablaUsuario() {
        let tabla = `<table border="1"><tr><th>ID</th><th>Nombre de Usuario</th><th>Estado actual</th><th>Cambio de estado</th></tr>`;
        for (let i = 0; i < this.usuarios.length; i++) {
            //obtenemos el objeto de la lista.
            let usuarioX = this.usuarios[i];
            let botonEstado = ''
            if (usuarioX.estado === 'pendiente'){
                botonEstado = 'Habilitar'
            }else if(usuarioX.estado === 'bloqueado'){
                botonEstado = 'Desbloquear'
            }else{
                botonEstado = 'Bloquear'
            }
            let filaX = `<tr><td>${usuarioX.idUsuario}</td><td>${usuarioX.nombreUsuario}</td><td>${usuarioX.estado}</td>
            <td><input type="button" value=${botonEstado} class="botonesAprobarUsuario" usuarioSeleccionado="${usuarioX.idUsuario}"/></td></tr>`;
            tabla += filaX;
        }
        tabla += `</table>`; //cierro tabla
        return tabla;
    }

     // OBTENER TABLAS - INSTANCIAS MODIFICAR STOCK

    obtenerTablaStockModificar() {
        let tabla = `<table border="1"><tr><th>ID</th><th>Tipo</th><th>Tamaño</th><th>Optimizacion</th><th>Stock</th><th>Acción</th></tr>`;
        for (let i = 0; i < this.instancias.length; i++) {
            //obtenemos el objeto de la lista.
            let instanciaX = this.instancias[i];
            let instanciaId = this.obtenerIdInstancia(instanciaX.idInstancia)
            let filaX = `<tr><td>${instanciaId}</td><td>${instanciaX.tipo}</td><td>${instanciaX.tamanio}</td><td>${instanciaX.optimizacion}</td>
                <td>${instanciaX.stock}</td>
                <td><input type="button" value="Modificar" class="botonesModificarStock" instanciaSeleccionada="${instanciaX.idInstancia}"/></td></tr>`;
            tabla += filaX;

        }

        tabla += `</table>`; //cierro tabla
        return tabla;
    }

    // OBTENER COMBOBOX - ALQUILAR INSTANCIA

    obtenerComboInstanciasAlquilar() {
        let combo = `<select id="selInstanciasAlquilar"><option value="-1">Elija Instancia</option>`;
        let opciones = "";
        for (let i = 0; i < this.instancias.length; i++) {
            let instanciasX = this.instancias[i];
            opciones += `<option value="${instanciasX.idInstancia}">${instanciasX.tipo} - ${instanciasX.tamanio} </option>`;
        }
        combo += opciones
        combo += `</select>`;
        return combo;
    }

    // OBTENER COMBOBOX - MOSTRAR INSTANCIA ALQUILADA

    obtenerComboEstadoAlquiladas() {
        let combo = `<select id="selInstanciasAlquiladas"><option value="todos">Elija estado</option>`;
        let opciones = "";
        opciones += `<option value="encendido">Encendido</option>`;
        opciones += `<option value="apagado">Apagado</option>`;
        combo += opciones
        combo += `</select>`;
        return combo;
    }

    // OBTENER COMBOBOX - MOSTRAR INSTANCIA A MODIFICAR EL STOCK

    obtenerComboInstanciasModificarStock(){
        let combo = `<select id="selInstancias"><option value="-1">Elija Instancia</option>`;
        let opciones = "";
        for (let i = 0; i < this.instancias.length; i++) {
            let instanciasX = this.instancias[i];
            opciones += `<option value="${instanciasX.idInstancia}">${instanciasX.tipo} - ${instanciasX.tamanio} </option>`;
        }
        combo += opciones
        combo += `</select>`;
        return combo;
    }

    // ---------- VALIDAR TARJETA ----------

    //VALIDACION TARJETA

    validarTarjeta(pNumero) {
        /*Se estara iterando numero a numero, desde el final del string hasta el primer caracter, se estarán
          sumando y sustituyendo por duplicado cuando sea par, ya que sería el segundo nro. */
        let suma = 0;
        let digitoVerificadorX = Number(pNumero.charAt(pNumero.length - 1));
        let contador = 0; //para saber cuando estamos en los segundos, lo pares.
        let haynro = true;
        let i = pNumero.length - 2; //el penúltimo.
        //Mientras los numeros sea mayor o igual a 0 se estara tomando cada caracter
        while (i >= 0 && haynro) {
          //Obtener el numero
          let caracter = pNumero.charAt(i);
          //Valida que el número sea válido
          if (!isNaN(caracter)) {
            let num = Number(caracter);
            //Duplicando cada segundo dígito
            if (contador % 2 == 0) {
              num = this.duplicarPar(num); //porque si es mayor a 9 se deben sumar.
            }
            suma += num;
          } else {
            haynro = false;
          }
          i--;
          contador++;
        }
        let digitoVerificadorValido = this.checkDigito(suma, digitoVerificadorX);
        let modulodelasumaValiado = this.checkModulo(suma, digitoVerificadorX);
        return digitoVerificadorValido && modulodelasumaValiado;
    }

    //DUPLICAR PAR

    duplicarPar(pNum) {
        pNum = pNum * 2;
        if (pNum > 9) {
            /*Si el resultado del multiplicación es mayor a 9 entonces lo descomponemos y sumamos. 
            Como el numero sera x>=10 && x<=19
            Entonces es 1+(num % 10) 1 más el resto de dividir entre 10.*/
            pNum = 1 + (pNum % 10);
        }
        return pNum;
    }

    //CHECKEA DIGITO

    checkDigito(pSuma, pDigito) {
        /* 1. Calcular la suma de los dígitos (67).
        2. Multiplicar por 9 (603).
        3. Tomar el último dígito (3).
        4. El resultado es el dígito de chequeo.*/
        let total = 9 * pSuma;
        let ultimoNro = total % 10
        return ultimoNro === pDigito;
    }

    //CHECKEA MODULO

    checkModulo(pSuma, pDigito) {
        /*
        Si el total del módulo 10 es igual a O (si el total termina en cero), entonces el número es válido 
        de acuerdo con la fórmula Luhn, de lo contrario no es válido.
        */
        let total = pSuma + pDigito;
        let validacionFinal = false;
        if (total % 10 === 0 && total !== 0) {
          validacionFinal = true;
        }
        return validacionFinal;
    }

    //VALIDA FORMATO TARJETA

    validarFormatoTarjeta(nroTarjeta){
        let ok = true
        let tarjeta = ''
        if (nroTarjeta.charAt(4) === '-' && nroTarjeta.charAt(9) === '-' && nroTarjeta.charAt(14) === '-'){
            for (let index = 0; index < nroTarjeta.length && ok; index++) {    
                if (index !== 4 && index !== 9 && index !== 14){
                    tarjeta += nroTarjeta.charAt(index)
                    if (isNaN(tarjeta)){
                        ok=false
                    }
                }
            }
        }else{
            ok = false
        }

        if (ok) {
            return tarjeta
        }else{
            return 'ERROR'
        }
       
    }

}   

