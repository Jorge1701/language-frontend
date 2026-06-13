export interface VerbConjugations {
  fps: string;
  sps: string;
  tps: string;
  fpp: string;
  spp: string;
  tpp: string;
}

export interface VerbExercise {
  tense: Tense;
  pronoun: Pronoun;
  verb: string;
  conjugation: string;
}

export enum Tense {
  SIMPLE_PRESENT,
  IMPERFECT_PAST,
  SIMPLE_PAST,
  PAST_PERFECT,
  SIMPLE_FUTURE,
  CONDITIONAL,
}

export enum Pronoun {
  FIRST_PERSON_SINGULAR,
  SECOND_PERSON_SINGULAR,
  THIRD_PERSON_SINGULAR,
  FIRST_PERSON_PLURAL,
  SECOND_PERSON_PLURAL,
  THIRD_PERSON_PLURAL,
}

export class ExerciseResult {
  exerciseInfo: VerbExercise
  response: string

  constructor(exerciseInfo: VerbExercise, response: string) {
    this.exerciseInfo = exerciseInfo
    this.response = response
  }
}

export class Session {
  date: string
  results: ExerciseResult[]

  constructor(date: string, results: ExerciseResult[]) {
    this.date = date
    this.results = results
  }
}
