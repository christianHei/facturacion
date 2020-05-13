import {Empresa} from '../modelo/Empresa';
import {Usuario} from '../modelo/Usuario';
import {Cliente} from '../modelo/Cliente';
import {Identificacion} from '../modelo/Identificacion';
import {Parametro} from '../modelo/Parametro';

export class DatosServicio {
  public empresa: Empresa;
  public usuario: Usuario;
  public cliente: Cliente;
  public identificacion: Identificacion;
  public parametroIva: Parametro;
}
