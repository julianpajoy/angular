import { Asignatura } from "./asignatura";
import { Generico } from "./generico";
import { Pregunta } from "./pregunta";

export class Examen implements Generico{
    id: number | undefined;
    nombre: string | undefined;
    createAt: string | undefined;
    preguntas: Pregunta[] = [];
    asignaturaPadre: Asignatura | undefined;
    asignaturaHija: Asignatura | undefined;
    respondido: boolean | undefined;
}
