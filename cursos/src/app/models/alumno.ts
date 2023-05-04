import { Generico } from "./generico";

export class Alumno implements Generico{
    public id: number | undefined;  // Propiedad de la interfaz Generico
    public nombre: string | undefined;  // Propiedad de la interfaz Generico
    public apellido: string | undefined;
    public email: string | undefined;
    public createAt: string | undefined;
    public fotoHashCode: number | undefined;

}
