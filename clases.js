//---------- CREACION DE CLASES ----------

class Administradores{
    static idGeneralAdministrador = 0;
    constructor(){
        this.idAdministrador = Administradores.idGeneralAdministrador++;
        this.nombreUsuario = '';
        this.contrasenia = '';
        this.tipoUsuario = '';
    }
}

class Usuarios{
    static idGeneralUsuario = 0;
    constructor(){
        this.idUsuario = Usuarios.idGeneralUsuario++;
        this.nombre = '';
        this.apellido = '';
        this.nombreUsuario = '';
        this.contrasenia = '';
        this.tipoUsuario = '';
        this.estado = '';
        this.nrotarjeta = '';
        this.cvc = '';
    }
}

class Instancia{
    static idGeneralInstancias = 0;
    constructor(){
        this.idInstancia = `INSTANCE_ID_${Instancia.idGeneralInstancias++}`;
        this.tipo = '';
        this.optimizacion = '';
        this.tamanio = '';
        this.precioEncendido = 0;
        this.precioAlquiler = 0;
        this.stock = 0;
    }
}

class Alquiler{
    static idGeneralAlquiler = 0;
    constructor(){
        this.idAlquiler = Alquiler.idGeneralAlquiler++;
        this.Usuario = null;
        this.Instancia = null;
        this.cantInicio = 1;
        this.estado = '';
    }
}
