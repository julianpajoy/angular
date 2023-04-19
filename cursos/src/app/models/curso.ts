import { Alumno } from "./alumno";
import { Examen } from "./examen";

export class Curso {

    id: number | undefined;
    nombre: string | undefined;
    createAt: string | undefined;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
}
