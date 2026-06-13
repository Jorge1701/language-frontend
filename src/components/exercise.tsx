import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { getSpecificPronounText, getTenseText } from "../utils/utils";
import { ExerciseResult, VerbExercise } from "../model/model";
import { useState, useEffect, useRef } from "react";

enum ExerciseStatus {
  NEW,
  SUCCESS,
  FAIL,
}

export function Exercise(props: {
  exercise: VerbExercise,
  next: (result: ExerciseResult) => void,
  finish: () => void,
}) {
  const [status, setStatus] = useState(ExerciseStatus.NEW)
  const [input, setInput] = useState('')
  const [pronounText, setPronounText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPronounText(getSpecificPronounText(props.exercise.pronoun))
    inputRef.current?.focus()
  }, [props.exercise])

  const check = () => {
    if (status === ExerciseStatus.NEW && props.exercise) {
      if (props.exercise.conjugation === input.toLowerCase().trim()) {
        setStatus(ExerciseStatus.SUCCESS)
      } else {
        setStatus(ExerciseStatus.FAIL)
      }
    } else {
      setInput('')
      setPronounText('')
      setStatus(ExerciseStatus.NEW)

      props.next(new ExerciseResult(props.exercise, input))
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
      	<Typography variant="h5">[{ getTenseText(props.exercise.tense) }]</Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{ pronounText }</Typography>
          <Typography variant="h6">({ props.exercise.verb })</Typography>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
        	fullWidth
          inputRef={inputRef}
          value={input}
          placeholder="Conjugação..."
          slotProps={{ input: { readOnly: status !== ExerciseStatus.NEW } }}
          onChange={ (e) => setInput(e.target.value) }
          onKeyDown={ (e) => e.key === "Enter" && check() } />
      </Grid>

      { status === ExerciseStatus.SUCCESS && (
        <Grid size={{ xs: 12 }}>
          <Typography align="center" variant="h5" color="success" sx={{ fontWeight: 700 }}>Correcto!</Typography>
        </Grid>
      ) }

      { status === ExerciseStatus.FAIL && (
  	    <Grid size={{ xs: 12 }}>
          <Typography align="center" variant="h5" color="error" sx={{ fontWeight: 700 }}>Incorrecto!</Typography>
          <Typography align="center" variant="h6">Respuesta: { pronounText } { props.exercise.conjugation }</Typography>
        </Grid>
      ) }

      <Grid size={{ xs: 12, md: 6 }}>
        <Button
        	fullWidth
        	variant="contained"
          onClick={check}>
          { status === ExerciseStatus.NEW ? 'Corrigir' : 'Seguinte' }
        </Button>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Button
        	fullWidth
          onClick={props.finish}>
          Finalizar
        </Button>
      </Grid>
    </Grid>
  )
}
