export interface VerbConjugations {
  fps: string;
  sps: string;
  tps: string;
  fpp: string;
  spp: string;
  tpp: string;
}

export interface VerbInfo {
  type: string;
  infinitive: string;
  present_participle: string;
  past_participle: string;
  simple_present: VerbConjugations;
  imperfect_past: VerbConjugations;
  simple_past: VerbConjugations;
  past_perfect: VerbConjugations;
  simple_future: VerbConjugations;
  conditional: VerbConjugations;
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

export class ExerciseInfo {
  verb: string
  tense: Tense
  pronoun: Pronoun
  correct: string

  constructor(verb: string, tense: Tense, pronoun: Pronoun, correct: string) {
    this.verb = verb
    this.tense = tense
    this.pronoun = pronoun
    this.correct = correct
  }
}

export class ExerciseResult {
  exerciseInfo: ExerciseInfo
  response: string

  constructor(exerciseInfo: ExerciseInfo, response: string) {
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
