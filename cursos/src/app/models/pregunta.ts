import { Examen } from "./examen";

export class Pregunta {
    id: number | undefined;
    texto: string | undefined;
    examen: Examen | undefined;
}
