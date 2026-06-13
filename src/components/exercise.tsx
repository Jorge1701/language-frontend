import { Alert, Button, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { capFirst, getSpecificPronounText, getTenseText } from "../utils/utils";
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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
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
          { props.exercise.example ? (
            <Typography variant="subtitle1">
              {props.exercise.example?.pt.split(props.exercise.conjugation)[0]}
              {status === ExerciseStatus.NEW && `(${props.exercise.verb}) ____`}
              {status === ExerciseStatus.SUCCESS && (
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {props.exercise.conjugation}
                </span>
              )}
              {status === ExerciseStatus.FAIL && (
                <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  {props.exercise.conjugation}
                </span>
              )}
              {props.exercise.example?.pt.split(props.exercise.conjugation)[1]}
            </Typography>
          ) : (
            <Typography variant="subtitle1">
              {capFirst(props.exercise.pronoun)}{' '}
              {status === ExerciseStatus.NEW && `(${props.exercise.verb}) ____`}
              {status === ExerciseStatus.SUCCESS && (
                <span style={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {props.exercise.conjugation}
                </span>
              )}
              {status === ExerciseStatus.FAIL && (
                <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  {props.exercise.conjugation}
                </span>
              )}
            </Typography>
          ) }
          { status !== ExerciseStatus.NEW && props.exercise.example && (
            <div>
              <Divider />
              <Typography variant="subtitle1">
                {props.exercise.example.es}
              </Typography>
            </div>
          ) }
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
