import { Pronoun, Tense, VerbConjugations, VerbInfo } from "../model/model"

export function getRandom(max: number): number {
  return Math.floor(Math.random() * max)
}

export function getEnumLength(e: any): number {
  return Object.values(e).filter((v) => typeof v === "number").length
}

export function getEnumValues(e: any): number[] {
  return Object.values(e).filter((v) => typeof v === "number")
}

export function getTenseText(tense: Tense): string {
  switch (tense) {
    case Tense.SIMPLE_PRESENT:
      return "Presente"
    case Tense.IMPERFECT_PAST:
      return "Pretérito Imperfeito"
    case Tense.SIMPLE_PAST:
      return "Pretérito Perfeito"
    case Tense.PAST_PERFECT:
      return "Pretérito Mais-que-perfeito"
    case Tense.SIMPLE_FUTURE:
      return "Futuro do Presente"
    case Tense.CONDITIONAL:
      return "Futuro do Pretérito"
  }
}

export function getPronounText(pronoun: Pronoun): string {
  switch (pronoun) {
    case Pronoun.FIRST_PERSON_SINGULAR:
      return "Eu"
    case Pronoun.SECOND_PERSON_SINGULAR:
      return "Tu"
    case Pronoun.THIRD_PERSON_SINGULAR:
      return "Você/ele/ela"
    case Pronoun.FIRST_PERSON_PLURAL:
      return "Nós"
    case Pronoun.SECOND_PERSON_PLURAL:
      return "Vós"
    case Pronoun.THIRD_PERSON_PLURAL:
      return "Vocês/eles/elas"
  }
}

export function getSpecificPronounText(pronoun: Pronoun): string {
  switch (pronoun) {
    case Pronoun.FIRST_PERSON_SINGULAR:
      return "Eu"
    case Pronoun.SECOND_PERSON_SINGULAR:
      return "Tu"
    case Pronoun.THIRD_PERSON_SINGULAR:
      return ["Você", "Ele", "Ela"][getRandom(3)]
    case Pronoun.FIRST_PERSON_PLURAL:
      return "Nós"
    case Pronoun.SECOND_PERSON_PLURAL:
      return "Vós"
    case Pronoun.THIRD_PERSON_PLURAL:
      return ["Vocês", "Eles", "Elas"][getRandom(3)]
  }
}

export function getRightConjugation(tense: Tense, pronoun: Pronoun, verbInfo: VerbInfo): string {
  switch (tense) {
    case Tense.SIMPLE_PRESENT:
      return getRightConjugationForPronoun(pronoun, verbInfo.simple_present)
    case Tense.IMPERFECT_PAST:
      return getRightConjugationForPronoun(pronoun, verbInfo.imperfect_past)
    case Tense.SIMPLE_PAST:
      return getRightConjugationForPronoun(pronoun, verbInfo.simple_past)
    case Tense.PAST_PERFECT:
      return getRightConjugationForPronoun(pronoun, verbInfo.past_perfect)
    case Tense.SIMPLE_FUTURE:
      return getRightConjugationForPronoun(pronoun, verbInfo.simple_future)
    case Tense.CONDITIONAL:
      return getRightConjugationForPronoun(pronoun, verbInfo.conditional)
  }
}

export function getRightConjugationForPronoun(pronoun: Pronoun, verbConjugations: VerbConjugations): string {
  switch (pronoun) {
    case Pronoun.FIRST_PERSON_SINGULAR:
      return verbConjugations.fps
    case Pronoun.SECOND_PERSON_SINGULAR:
    	return verbConjugations.sps
    case Pronoun.THIRD_PERSON_SINGULAR:
    	return verbConjugations.tps
    case Pronoun.FIRST_PERSON_PLURAL:
    	return verbConjugations.fpp
    case Pronoun.SECOND_PERSON_PLURAL:
    	return verbConjugations.spp
    case Pronoun.THIRD_PERSON_PLURAL:
    	return verbConjugations.tpp
  }
}
