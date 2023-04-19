import { Asignatura } from "./asignatura";
import { Pregunta } from "./pregunta";

export class Examen {
    id: number | undefined;
    nombre: string | undefined;
    createAt: string | undefined;
    preguntas: Pregunta[] = [];
    asignatura: Asignatura | undefined;
    respondido: boolean | undefined;
}
