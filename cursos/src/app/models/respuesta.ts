import { Alumno } from "./alumno";
import { Pregunta } from "./pregunta";

export class Respuesta {
    id: string | undefined;
    texto: string | undefined;
    alumno: Alumno | undefined;
    pregunta: Pregunta | undefined;
}
