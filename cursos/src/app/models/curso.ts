import { Alumno } from "./alumno";
import { Examen } from "./examen";
import { Generico } from "./generico";

export class Curso implements Generico {

    id: number | undefined;
    nombre: string | undefined;
    createAt: string | undefined;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
}
