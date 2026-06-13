import { useState, useEffect } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Checkbox, CircularProgress, Divider, FormControlLabel, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { ExerciseResult, Pronoun, Tense, VerbExercise } from "../model/model"
import { getEnumValues, getPronounText, getRandom, getTenseText, mapEnum } from "../utils/utils"
import { Exercise } from "../components/exercise"
import { ExpandMore } from "@mui/icons-material"
import { API_BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { addToCurrentSession, deleteCurrentSession, getCurrentSession, saveSession as addToSessionHistory } from "../utils/memory"

export default function VerbExerciseConfigPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [verbListTab, setVerbListTab] = useState(0)

  const [topVerbs, setTopVerbs] = useState(10)
  const [verbList, setVerbList] = useState('')

  const [checkedTenses, setCheckedTenses] = useState([true, false, true, false, false, false])
  const [checkedPronouns, setCheckedPronouns] = useState([true, false, true, true, false, true])

  const [exercise, setExercise] = useState<VerbExercise | null>(null)

  useEffect(() => {
    deleteCurrentSession()
  }, [])

  const start = async () => {
    nextExercise()
  }

  const getTenseAndPronoun = (): [Tense, Pronoun] => {
    const mapSelectedTenses = {
      [Tense.SIMPLE_PRESENT]: checkedTenses[0],
      [Tense.IMPERFECT_PAST]: checkedTenses[1],
      [Tense.SIMPLE_PAST]: checkedTenses[2],
      [Tense.PAST_PERFECT]: checkedTenses[3],
      [Tense.SIMPLE_FUTURE]: checkedTenses[4],
      [Tense.CONDITIONAL]: checkedTenses[5],
    }

    const mapSelectedPronouns = {
      [Pronoun.FIRST_PERSON_SINGULAR]: checkedPronouns[0],
      [Pronoun.SECOND_PERSON_SINGULAR]: checkedPronouns[1],
      [Pronoun.THIRD_PERSON_SINGULAR]: checkedPronouns[2],
      [Pronoun.FIRST_PERSON_PLURAL]: checkedPronouns[3],
      [Pronoun.SECOND_PERSON_PLURAL]: checkedPronouns[4],
      [Pronoun.THIRD_PERSON_PLURAL]: checkedPronouns[5],
    }

    const selectedTenses = Object.entries(mapSelectedTenses)
    	.filter(([_, value]) => value === true)
    	.map(([key, _]) => Number(key) as Tense)

    const selectedPronouns = Object.entries(mapSelectedPronouns)
    	.filter(([_, value]) => value === true)
    	.map(([key, _]) => Number(key) as Pronoun)

		const tense = selectedTenses[getRandom(selectedTenses.length)]
		const pronoun = selectedPronouns[getRandom(selectedPronouns.length)]

    return [tense, pronoun]
  }

  const getRandomVerb = async (tense: String, pronoun: String): Promise<VerbExercise> => {
    var res: VerbExercise
    if (verbListTab === 0) {
      const response = await fetch(`${API_BASE_URL}/verb/exercise?tense=${tense}&pronoun=${pronoun}&random_limit=${topVerbs}`)
      if (!response.ok) {
        return getRandomVerb(tense, pronoun)
      }
      res =  await (response.json() as Promise<VerbExercise>)
    } else {
      const list = verbList.toLowerCase().split(/[,\n ]/).filter(v => v.trim() !== '')
      const verb = list[getRandom(list.length)]
      const response = await fetch(`${API_BASE_URL}/verb/exercise?tense=${tense}&pronoun=${pronoun}&verb=${verb}`)
      if (!response.ok) {
        return getRandomVerb(tense, pronoun)
      }
      res = await (response.json() as Promise<VerbExercise>)
    }

    res.tense = mapEnum(res.tense.toString(), Tense)

    return res
  }

  const nextExercise = async () => {
    const [tense, pronoun] = getTenseAndPronoun()
    const verbExercise = await getRandomVerb(Tense[tense], Pronoun[pronoun])

    setExercise(verbExercise)
    setLoading(false)
  }

  const setSelectedVerbalTense = (index: number, value: boolean) =>{
    const newValues = [...checkedTenses]
    newValues[index] = value
    setCheckedTenses(newValues)
  }

  const setSelectedPronoun = (index: number, value: boolean) =>{
    const newValues = [...checkedPronouns]
    newValues[index] = value
    setCheckedPronouns(newValues)
  }

  const changeTopVerbs = (newValue: string) => {
    setTopVerbs(Number(newValue.replace(/\D/g, "")))
  }

  const next = (result: ExerciseResult) => {
    addToCurrentSession(result)
    nextExercise()
  }

  const finish = () => {
    const currSession = getCurrentSession()
    if (currSession) {
      addToSessionHistory(currSession)
      deleteCurrentSession()
    }
    setExercise(null)
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 1, py: 1.5 }}>

			{ !loading && !exercise && (
        <Stack spacing={1.5}>
        	<Card>
            <CardContent>
              <Stack direction="column" spacing={2}>
                <Typography variant="h5">Conjugações verbais</Typography>
                <Divider />
                <Typography variant="caption">Cada exercício apresentará um tempo verbal, um pronome e um verbo no infinitivo.</Typography>
                <Typography variant="caption">Você deve inserir a conjugação correta.</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="caption">Lista de verbos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Tabs
                  	value={verbListTab}
                    onChange={ (e, newValue) => { console.log(newValue); setVerbListTab(newValue) } }
                  	variant="fullWidth">
                    <Tab label={<Typography variant="caption">Predefinida</Typography>}/>
                    <Tab label={<Typography variant="caption">Personalizada</Typography>}/>
                  </Tabs>
                  <div hidden={verbListTab !== 0}>
                    <Stack spacing={3}>
                      <Typography variant="caption">No exercício serão usados os verbos mais frequentes, selecione quantos deles:</Typography>
                      <TextField
                        fullWidth
                        value={topVerbs}
                        size="small"
                        onChange={ (e) => changeTopVerbs(e.target.value) } />
                    </Stack>
                  </div>
                  <div hidden={verbListTab !== 1}>
                    <Stack spacing={3}>
                      <Typography variant="caption">No exercício serão usados os verbos que você escrever, no infinitivo, separados por vírgula, espaço ou enter</Typography>
                      <TextField
                        fullWidth
                        multiline
                        maxRows={10}
                        value={verbList}
                        size="small"
                        onChange={ (e) => setVerbList(e.target.value) }
                        placeholder="ej: falar, ser, morar" />
                    </Stack>
                  </div>
                </Stack>
              </AccordionDetails>
            </Accordion>

						<Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="caption">Tempos verbais</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  <Typography variant="caption">Selecione os tempos verbais que deseja practicar:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
                    { getEnumValues(Tense).map((t, i) => (
                      <FormControlLabel
                        key={t}
                        label={<Typography variant="caption">{getTenseText(t)}</Typography>}
                        control={
                          <Checkbox
                            checked={checkedTenses[i]}
                            size="small"
                            onChange={ (e) => { setSelectedVerbalTense(i, e.target.checked) } } />
                        }
                      />
                    ))}
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>

						<Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="caption">Pronomes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  <Typography variant="caption">Selecione os pronomes que deseja practicar:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
                    { getEnumValues(Pronoun).map((p, i) => (
                      <FormControlLabel
                        key={p}
                        label={<Typography variant="caption">{getPronounText(p)}</Typography>}
                        control={
                          <Checkbox
                            checked={checkedPronouns[i]}
                            size="small"
                            onChange={ (e) => { setSelectedPronoun(i, e.target.checked) } } />
                        }
                      />
                    ))}
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Button
          	variant="contained"
            onClick={start}>
            Começar
          </Button>

          <Button
          	variant="outlined"
            onClick={() => navigate("/verb-conjugation/results")}>
            Resultados
          </Button>

          <Button
            onClick={() => navigate("/")}>
            Voltar
          </Button>
        </Stack>
      ) }

      { loading && (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "20vh" }}>
        	<CircularProgress />
        </Box>
      ) }

			{ !loading && exercise && (
        <Exercise
        	exercise={exercise}
          next={next}
          finish={finish} />
      ) }

    </Box>
  )
}
