import {DIFFICULTY} from "@/hooks/use-settings";

export interface MinMax {
    min:number,
    max:number
}

export enum ProblemType {
    ADDITION = "ADDITION",
    SUBTRACTION = "SUBTRACTION",
    MULTIPLICATION = "MULTIPLICATION",
    DIVISION = "DIVISION"
}

export interface IMathProblem {
    number1: number;
    number2: number;
    answer: number;
    type: ProblemType
    difficulty: DIFFICULTY
}