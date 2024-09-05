//---------- PRECARGA DE DATOS ----------

// preCargaDatosUsuarios - Precarga los datos de los usuarios

function preCargaDatosUsuarios(){
    let nombreUsuario = ['IgnacioORT','TatianaORT','GonzaloORT','CarlosORT','InvitadoORT']
    let contrasenia = ['Ig123','Ta123','Go123','Ca123','Inv123']
    let nombre = ['Ignacio','Tatiana','Gonzalo','Carlos','Invitado']
    let apellido = ['Hernandez','Olivera','Gentile','Rodriguez','Umpierrez']
    let tipoUsuario = ['usuarios','usuarios','usuarios','usuarios','usuarios']
    let estado = ['habilitado','habilitado','habilitado','pendiente','bloqueado']
    let cvc = ['123','456','789','101','112']
    let nrotarjeta = ['3764-2853-4826-3861','3764-2853-4826-3861','3764-2853-4826-3861','3764-2853-4826-3861','3764-2853-4826-3861']
    let nroTarjetaAux = ''
    for (let i = 0; i < nombreUsuario.length; i++) {
        nroTarjetaAux = miSistema.validarFormatoTarjeta(nrotarjeta[i])
        miSistema.agregarUsuario(nombreUsuario[i], contrasenia[i], nombre[i], apellido[i],tipoUsuario[i],estado[i],nroTarjetaAux,cvc[i])
    }
}

// preCargaDatosAdmin - Precarga los datos de los administradores

function preCargaDatosAdmin(){
    let nombreUsuario = ['Admin1','Admin2','Admin3','Admin4','Admin5']
    let contrasenia = ['Ad111','Ad222','Ad333','Ad444','Ad555']
    let tipoUsuario = ['administradores','administradores','administradores','administradores','administradores']
    for (let i = 0; i < nombreUsuario.length; i++) {
        miSistema.agregarAdmin(nombreUsuario[i], contrasenia[i],tipoUsuario[i])
    }
    
}

// preCargaDatosInstancia - Precarga los datos de las instancias

function preCargaDatosInstancia(){
    let tipo = ['c7','c7','c7','r7','r7','r7','i7','i7']
    let optimizacion = ['computo','computo','computo','memoria','memoria','memoria','almacenamiento','almacenamiento']
    let tamanio = ['small','medium','large','small','medium','large','medium','large']
    let precioEncendido = [2.50,3.50,6.00,4.00,6.50,7.00,3.50,6.50]
    let precioAlquiler = [20,30,50,35,50,60,30,50]
    let stock = [7,7,7,7,7,7,7,7]
    for (let index = 0; index < tipo.length; index++) {
        miSistema.agregarInstancia( tipo[index], optimizacion[index], tamanio[index], precioEncendido[index], precioAlquiler[index], stock[index])
    }
}

// preCargaDatosAlquileres - Precarga los datos de los alquileres

function preCargaDatosAlquiler(){
    let usuario = [miSistema.usuarios[0],miSistema.usuarios[1],miSistema.usuarios[2],miSistema.usuarios[3],miSistema.usuarios[4],miSistema.usuarios[1],miSistema.usuarios[2],miSistema.usuarios[3],miSistema.usuarios[0],miSistema.usuarios[1]]
    let instancia = [miSistema.instancias[0],miSistema.instancias[1],miSistema.instancias[2],miSistema.instancias[6],miSistema.instancias[5],miSistema.instancias[3],miSistema.instancias[4],miSistema.instancias[5],miSistema.instancias[2],miSistema.instancias[1]]
    let cantInicio = [3,1,1,2,5,6,1,3,5,6]
    let estado = ['encendido','encendido','encendido','encendido','apagado','apagado','encendido','apagado','apagado','encendido']
    for (let index = 0; index < usuario.length; index++) {
        let instanciaX = instancia[index]
        miSistema.agregarAlquilerInstancia(instanciaX.idInstancia,usuario[index],estado[index],cantInicio[index])
    }
}

