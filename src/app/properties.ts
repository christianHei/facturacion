import { Injectable } from '@angular/core';

@Injectable()
export class Properties {

  //buttons
  btn_iniciar_sesion = 'Iniciar sesión';
  btn_olvidaste_tu_contrasenia = '¿Olvidaste tu contraseña?';
  btn_registrate_gratis = 'Regístrate gratis';
  btn_guardar = 'Guardar';
  btn_continuar = 'Continuar';
  btn_guardar_continuar = 'Guardar y continuar';
  btn_cancelar = 'Cancelar';
  btn_eliminar = 'Eliminar';
  btn_nuevo = 'Nuevo';
  btn_agregar = 'Agregar';
  btn_empezar = 'Empezar';
  btn_si = 'Si';
  btn_no = 'No';

  //labels
  lbl_nombre_usuario = 'Nombre de usuario';
  lbl_contrasenia = 'Contraseña';
  lbl_ruc = 'RUC';
  lbl_razon_social = 'Razón social';
  lbl_email = 'Email';
  lbl_telefono = 'Teléfono';
  lbl_celular = 'Celular';
  lbl_direccion = 'Dirección';
  lbl_nombre = 'Nombre';
  lbl_apellido = 'Apellido';
  lbl_descripcion = 'Descripción';
  lbl_tipo_documento = 'Tipo documento';
  lbl_numero_documento = 'Número documento';
  lbl_identificacion = 'Identificación';
  lbl_razon_social_nombre_apellido = 'Razón Social / Nombres y Apellidos';
  lbl_fecha_emision = 'Fecha de emisión';
  lbl_detalle_factura = 'Detalle de la factura';
  lbl_precio = 'Precio';
  lbl_codigo = 'Código';
  lbl_producto = 'Producto';
  lbl_cantidad = 'Cantidad';
  lbl_seleccione = 'Seleccione';
  lbl_lista_productos = 'Lista de productos';
  lbl_confirmar_contrasenia = 'Confirmar contraseña';
  lbl_ingreso_nombre_usuario = 'Ingrese el nombre de usuario';
  lbl_ingreso_contrasenia = 'Ingrese la contraseña';
  lbl_subtotal_12 = 'Subtotal 12%';
  lbl_subtotal_0 = 'Subtotal 0%';
  lbl_iva = 'IVA 12%';
  lbl_total = 'Total';
  lbl_registro_empresa = 'Registro empresa';
  lbl_registro_usuario = 'Registro usuario';
  lbl_cliente = 'Cliente';
  lbl_facturacion = 'Facturación';
  lbl_facturar = 'Facturar';

  //info

  //success
  succes_guardar = 'La información se ha guardado correctamente.';
  succes_actualizar = 'La información se ha actualizado correctamente.';
  succes_eliminar = 'La información se ha eliminado correctamente.';


  //error
  error_campo_requerido = 'Campo requerido';

  //warn
  warn_existe_registro = 'Registro duplicado.';
  warn_guardar = 'La información no se ha podido guardar.';
  warn_actualizar = 'La información no se ha podido actualizar.';
  warn_eliminar = 'La información no se ha podido eliminar.';
  warn_claves_diferentes = 'La contraseñas no coinciden.';
  warn_empresa_existe = 'Ya existe una empresa con el RUC ingresado.';
  warn_usuario_existe = 'Ya existe el nombre de usuario ingresado.';
  warn_usuario_clave_incorrecto = 'Nombre de usuario o clave incorrecto.';
  warn_email_incorrecto = 'Ingrese un email válido.';

  //confirm
  confirm_eliminar = '¿Desea eliminar este registro?';
  confirm_facturar = '¿Desea generar la factura?. Se enviará una notificación al correo electrónico del cliente.';

  //constantes
  parametro_iva = 'IVA';
}
