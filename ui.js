window.addEventListener("load", Eventos);

//Asignamos las funciones a los botones

function Eventos() {
    document.querySelector("#btnIngreso_F02").addEventListener("click", loginUI);
    document.querySelector("#btnRegistrarse_F01").addEventListener("click", RegistrarUsuarioUI);
    document.querySelector("#btnMostrarListaUsuarios").addEventListener("click", verReporteUsuarios);
    document.querySelector("#btnMenuAdminCerrar").addEventListener("click", cerrarSesionUI);
    document.querySelector("#btnMenuUsuarioCerrar").addEventListener("click", cerrarSesionUI);
    document.querySelector("#btnVerStock").addEventListener("click", verModificarStockUI);
    document.querySelector("#btnConsultarCostos_F03").addEventListener("click", verAlquilarinstanciaUI);
    document.querySelector("#btnF04Consultar").addEventListener("click", VerMaquinasAlquiladasUI);
    document.querySelector("#btnMostrarCostoTotal_F05").addEventListener("click", VerCostoTotalUI);
    document.querySelector("#btnMostrarMaquinasVirtuales").addEventListener("click", VerInformeVirtualesUI);
    
}


let miSistema = new Sistema();

//Precargamos los datos 

preCargaDatosUsuarios();
preCargaDatosAdmin();
preCargaDatosInstancia();
preCargaDatosAlquiler();

//Inicializamos el menu 

ocultarTodo();
iniciar();
ComboBoxInstanciasUI()
asignarEventosBotonVerVentana()

function asignarEventosBotonVerVentana() {
    let listaBotones = document.querySelectorAll(`.btnMenu`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", VerVentana);
    }
}

// VerVentana - Muestra la UI que se le indique

function VerVentana() {
    ocultarTodo();
    Limpiar()
    let BtnClick = this;
    let idVentana = BtnClick.getAttribute("Navegacion");
    document.querySelector(idVentana).style.display = "block";
}

// Limpiar - Limpia los datos de la UI

function Limpiar() {
    document.querySelector('#ResultadoF01Registro').value = null
    document.querySelector('#txtNombreF01').value = null
    document.querySelector('#txtApellidoF01').value = null
    document.querySelector('#txtNombreUsF01').value = null
    document.querySelector('#txtContraseniaF01').value = null
    document.querySelector('#txtTarjetaF01').value = null
    document.querySelector('#txtCVCF01').value = null
    document.querySelector('#txtRegNombreDeUsuario_F02').value = null
    document.querySelector('#txtRegContraseñaUsuario_F02').value = null
    document.querySelector('#divVerInstanciasAlquiler').innerHTML = null
    document.querySelector('#MostrarTipoTamanioInstancia').innerHTML = null
    document.querySelector('#pErrorSel_F03').innerHTML = null
    document.querySelector('#divTablaConListado').innerHTML = null
    document.querySelector('#pMostrarMensajeAlquilada').innerHTML = null
    document.querySelector('#divF05TablaCostoTotal').innerHTML = null
    document.querySelector('#divMostrarReporteUsuario').innerHTML = null
    document.querySelector('#divMostrarModificarStock').innerHTML = null
    document.querySelector('#divMostrarMensajesModificarVentas').innerHTML = null
    document.querySelector('#divTablaMaquinasVirtuales').innerHTML = null
    document.querySelector('#selTipoUsuario_F02').value = 'Seleccione'
    document.querySelector('#pErrorIngreso_F02').value = 'Seleccione'  
}

// ocultarTodo - Oculta toda la UI de la aplicación

function ocultarTodo() {
    document.querySelector("#divF01Registrar").style.display = "none";
    document.querySelector("#divF02Login").style.display = "none";
    document.querySelector("#divF03Alquilar").style.display = "none";
    document.querySelector("#divF04ConsultarMaquinas").style.display = "none";
    document.querySelector("#divF05ConsultarCostoTotal").style.display = "none";
    document.querySelector("#divF06Aprobacion").style.display = "none";
    document.querySelector("#divF07ModificarStock").style.display = "none";
    document.querySelector("#divF08InformeMaquinas").style.display = "none";
    document.querySelector("#divF09MenuUsuario").style.display = "none";
    document.querySelector("#divF10MenuAdmin").style.display = "none";
}

// iniciar - Muestra la UI de login

function iniciar() { 
    document.querySelector("#divF02Login").style.display = "block";
}

// mostrarFuncionalidades - Muestra el menu del tipo de usuario que inicie sesion

function mostrarFuncionalidades(tipoUsuario) {
    if (tipoUsuario === 'usuarios') {
        document.querySelector("#divF09MenuUsuario").style.display = "block";
    } else {
        document.querySelector("#divF10MenuAdmin").style.display = "block";
    }
}

// ---------- FUNCION LISTADO COSTO TOTAL - METODOS UI ----------

function VerInformeVirtualesUI(){
    let tabla = miSistema.obtenerTablaInformeInstancias();
    document.querySelector("#divTablaMaquinasVirtuales").innerHTML = tabla;
}

// ---------- FUNCION LISTADO VER INFORMES - METODOS UI ----------

function VerCostoTotalUI(){
    let tabla = miSistema.obtenerTablaCostoTotal();
    document.querySelector("#divF05TablaCostoTotal").innerHTML = tabla;
}


// ---------- FUNCION LISTADO MAQUINAS ALQUILADAS - METODOS UI ----------

// Funcion ComboBoxInstanciasUI - Se muestran las instancias en un select
function ComboBoxInstanciasUI(){
    let comboBox = '<label>Estado:</label>'
    comboBox += miSistema.obtenerComboEstadoAlquiladas();
    document.querySelector("#divComboBoxInstancia").innerHTML = comboBox;
    
}

// Funcion VerMaquinasAlquildasUI - Se muestran las maquinas alquiladas por el usuario logueado

function VerMaquinasAlquiladasUI(){
    let slcEstado = document.querySelector("#selInstanciasAlquiladas").value;
    let tabla = miSistema.obtenerTablaMaquinaAlquilada(slcEstado);
    document.querySelector("#divTablaConListado").innerHTML = tabla;
    asignarEventosBotonInstanciasAlquiladas() 
}

function asignarEventosBotonInstanciasAlquiladas() {
    let listaBotones = document.querySelectorAll(`.botonesModificarEstado`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", clickBotonEncenderMaquina);
    }
}

function clickBotonEncenderMaquina() {
    let mensaje = "";
    let elBotonClickeado = this; //quien dispara, quien llamo a el evento, en este caso el botón.
    let idAlquiler = elBotonClickeado.getAttribute("AlquilerSeleccionada");
    let idAlquilerAux = Number(idAlquiler);
    if (miSistema.encendidoInstancia(idAlquilerAux)) {
        mensaje = "Se cambio el estado correctamente";
    } else {
        mensaje = "Ocurrio un error, no se cambio el estado";
    }
    document.querySelector("#pMostrarMensajeAlquilada").innerHTML = mensaje;
    VerMaquinasAlquiladasUI();
}


// ---------- FUNCION ALQUILAR - METODOS UI ----------

// Mostramos la interfaz de Alquilar 

function verAlquilarinstanciaUI() {
    let tabla = miSistema.obtenerTablaInstanciasAlquilar();
    let comboBox = '<label>Instancia a alquilar:</label>'
    comboBox += miSistema.obtenerComboInstanciasAlquilar();
    comboBox +=  `<p><input class="btnAlquiler_F03" id="btnConsultarAlquilar_F03" type="button" value="Alquilar" /></p>`
    document.querySelector("#divVerInstanciasAlquiler").innerHTML = tabla;
    document.querySelector("#MostrarTipoTamanioInstancia").innerHTML = comboBox;
    
    asignarEventosBotonAlquiler()
}

// Asignamos al boton la funcion de alquilarUI

function asignarEventosBotonAlquiler() {
    let listaBotones = document.querySelectorAll(`.btnAlquiler_F03`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", AlquilarUI);
    }
}

// Funcion AlquilarUI - Realiza el proceso de alquiler de una instancia

function AlquilarUI() {
    let mensaje = "";
    let instanciaId = document.querySelector("#selInstanciasAlquilar").value;
    let instanciasX = miSistema.buscarElemento(miSistema.instancias, instanciaId, 'idInstancia');
    if (instanciasX !== null) {
        if (miSistema.validarStockInstanciaAlquilar(instanciasX,1)) {
            if (miSistema.agregarAlquilerInstancia(instanciaId,miSistema.logueado[0],'encendido',1)) {
                mensaje = `Se alquilo con éxito la instancia con id ${instanciasX.idInstancia}.`;
                verAlquilarinstanciaUI()
            } else {
                mensaje = "Error al alquilar"
            }
        } else {
            mensaje = `Falta stock.`;
        }
    } else {
        mensaje = "No se encuentra instancia";
    }
    document.querySelector("#pErrorSel_F03").innerHTML = mensaje;
}

// ---------- FUNCION MODIFICAR STOCK - METODOS UI ----------

// Mostramos la interfaz de modificar

function verModificarStockUI() {
    let mensaje = miSistema.obtenerTablaStockModificar();
    document.querySelector("#divMostrarModificarStock").innerHTML = mensaje;
    asignarEventosTablaModificarStock();
}

// Asignamos al boton la funcion de clickBotonModificarStock

function asignarEventosTablaModificarStock() {
    let listaBotones = document.querySelectorAll(`.botonesModificarStock`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", clickBotonModificarStock);
    }
}

// Asignamos al boton la funcion de clickBotonFormularioModificarStock

function asignarEventosFormularioModificarStock() {
    let listaBotones = document.querySelectorAll(`.botonesFormularioModificarStock`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", clickBotonFormularioModificarStock);
    }
}

// Funcion clickBotonModificarStock - Muestra la UI para seleccionar la instancia a modificar de su stock

function clickBotonModificarStock() {
    let elBotonClickeado = this;
    let elIdStock = elBotonClickeado.getAttribute("instanciaSeleccionada");
    let idStockN = miSistema.AgregarIdInstancia(elIdStock)
    let elStock = miSistema.buscarElemento(miSistema.instancias, elIdStock, 'idInstancia');
    if (elStock !== null) {
        let formularioModificar = `<h2>Modificar stock</h2>
        <label>Instancia:</label>`;
        formularioModificar += miSistema.obtenerComboInstanciasModificarStock() + '<br>';
        formularioModificar += `<br> <label>Cantidad:</label><input type="text" id="txtModificarStock" placeholder="Ingrese la cantidad" value="${elStock.stock}"/><br><br>
        <input type="button" value="Modificar" class="botonesFormularioModificarStock" elStock="${idStockN}" />
        <br><br>`;
        document.querySelector("#divMostrarMensajesModificarVentas").innerHTML = formularioModificar;
        document.querySelector("#selInstancias").value = elStock.idInstancia;
        asignarEventosFormularioModificarStock();
    }
}

// Funcion clickBotonFormularioModificarStock - Realiza el proceso de modificar el stock de una instancia

function clickBotonFormularioModificarStock() {
    let mensaje = "";
    let instanciaId = document.querySelector("#selInstancias").value;
    let cantidadStock = document.querySelector("#txtModificarStock").value;
    let instanciaX = miSistema.buscarElemento(miSistema.instancias, instanciaId, 'idInstancia');
    let usuarioX = miSistema.logueado[0].idAdministrador
    if (instanciaX !== null) {
        if (usuarioX !== null) {
            if (miSistema.validarNro(cantidadStock) && Number(cantidadStock) > 0) {
                cantidadStock = Number(cantidadStock);
                if (miSistema.modificarStock(instanciaId, 0, cantidadStock)) {
                    mensaje = `Se modificó con éxito el stock con id ${instanciaX.idInstancia}.`;
                    verModificarStockUI();
                } else {
                    mensaje = `error al modificar.`;
                }
            } else {
                mensaje = `error al modificar verifique cantidad.`;
            }
        }
    }
    document.querySelector("#divMostrarMensajesModificarVentas").innerHTML = mensaje;
}

// ---------- FUNCION APROBACION USUARIOS - METODOS UI ----------

// Funcion verReporteUsuarios - Muestra la tabla con los usuarios y sus estados

function verReporteUsuarios() {
    let mensaje = miSistema.obtenerTablaUsuario();
    document.querySelector("#divMostrarReporteUsuario").innerHTML = mensaje;
    asignarEventosTablaAprobacionUsuarios()
}

// Asignamos al boton la funcion de clickBotonAprobarUsuario 

function asignarEventosTablaAprobacionUsuarios() {
    let listaBotones = document.querySelectorAll(`.botonesAprobarUsuario`);
    for (let unBoton of listaBotones) {
        unBoton.addEventListener("click", clickBotonAprobarUsuario);
    }
}

// Funcion clickBotonAprobarUsuario - Realiza el cambio de estado del usuario

function clickBotonAprobarUsuario() {
    let mensaje = "";
    let elBotonClickeado = this; //quien dispara, quien llamo a el evento, en este caso el botón.
    let idUsuario = elBotonClickeado.getAttribute("usuarioSeleccionado");
    let idUsuarioAux = Number(idUsuario);
    if (miSistema.AprobacionUsuarios(idUsuarioAux)) {
        mensaje = "Se cambio el estado correctamente";
    } else {
        mensaje = "Ocurrio un error, no se cambio el estado";
    }
    document.querySelector("#pMostrarReporteUsuario").innerHTML = mensaje;
    verReporteUsuarios();
}

// ---------- FUNCION REGISTRAR USUARIOS - METODOS UI ----------

//Funcion RegistrarUsuarioUI - Realiza el proceso de registro del usuario

function RegistrarUsuarioUI() {
    let mensaje = ''
    let nombre = document.querySelector('#txtNombreF01').value
    let apellido = document.querySelector('#txtApellidoF01').value
    let nombreUsuario = document.querySelector('#txtNombreUsF01').value
    let contrasenia = document.querySelector('#txtContraseniaF01').value
    let nroTarjeta = document.querySelector('#txtTarjetaF01').value
    let cvc = document.querySelector('#txtCVCF01').value
    if (nombre.trim().length > 0 && apellido.trim().length > 0 && nombreUsuario.trim().length > 0 && contrasenia.trim().length > 0 && cvc.trim().length > 0 && nroTarjeta.trim().length > 0) {
        let nroTarjetaAux = miSistema.validarFormatoTarjeta(nroTarjeta)
        if (!isNaN(nroTarjetaAux) && nroTarjetaAux !== "") {
            if (miSistema.agregarUsuario(nombreUsuario, contrasenia, nombre, apellido, 'usuarios', 'pendiente', nroTarjetaAux, cvc)) {
                mensaje = 'Registro exitoso';
                Limpiar()
            } else {
                mensaje = 'Ocurrio un error en el registro';
            }
        } else {
            mensaje = 'Para el numero de tarjeta debe ingresar el siguiente formato: XXXX-XXXX-XXXX-XXXX';
        }
    } else {
        mensaje = 'No debe tener campos vacios';
    }
    document.querySelector('#ResultadoF01Registro').innerHTML = mensaje
}

// ---------- FUNCION LOGIN USUARIOS - METODOS UI ----------

//Funcion loginUI - Realiza el proceso de loguearse en la aplicación

function loginUI() {
    let nombre = document.querySelector('#txtRegNombreDeUsuario_F02').value;
    let contraseña = document.querySelector('#txtRegContraseñaUsuario_F02').value;
    let tipoUsuario = document.querySelector('#selTipoUsuario_F02').value;
    let mensaje = ''
    let ok = true
    if (miSistema.login(nombre, contraseña, tipoUsuario)) {
        if (tipoUsuario === 'usuarios') {
            if (!miSistema.validacionEstado(nombre)) {
                mensaje = 'El usuario no esta habilitado.'
                ok = false
            }
        }
        if (ok) {
            mostrarFuncionalidades(tipoUsuario);
            document.querySelector("#pErrorIngreso_F02").innerHTML = "";
            document.querySelector("#divF02Login").style.display = "none";
        }
    } else {
        mensaje = 'Error de nombre usuario,contraseña o tipo de usuario'
    }
    document.querySelector("#pErrorIngreso_F02").innerHTML = mensaje;

}

// ---------- FUNCION CERRAR SESION - METODOS UI ----------

//Funcion loginUI - Realiza el proceso de cerrar sesion

function cerrarSesionUI() {
    let mensaje = "";
    if (miSistema.cerrarSesion()) {
        mensaje = "Hasta luego.";
    } else {
        mensaje = "no se pudo cerrar sesión";
    }
}