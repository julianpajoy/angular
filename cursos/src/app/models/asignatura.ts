export class Asignatura {
    id: number | undefined;
    nombre: string | undefined;
    padre: Asignatura | undefined;
    hijos: Asignatura[] = [];
}
