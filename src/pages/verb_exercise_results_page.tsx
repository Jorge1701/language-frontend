import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, List, ListItem, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getSessions } from "../utils/memory"
import { ExpandMore } from "@mui/icons-material"
import { getPronounText, getTenseText } from "../utils/utils"

export default function VerbExerciseResultPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 1, py: 1.5 }}>
    	<Stack spacing={2}>
        <Box>
          { getSessions().map((session, sessionIndex) => (
            <Accordion key={`session-${sessionIndex}`}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{session.date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  <Typography>Exercícios realizados: {session.results.length}</Typography>
                  <Typography>Corretos: {session.results.filter(r => r.exerciseInfo.conjugation.toLowerCase() === r.response.toLowerCase().trim()).length}</Typography>
                  <Typography>Incorretos: {session.results.filter(r => r.exerciseInfo.conjugation.toLowerCase() !== r.response.toLowerCase().trim()).length}</Typography>
                </Stack>
                <Stack>
                  { session.results.map((result, resultIndex) => (
                    <Stack key={`result-${sessionIndex}-${resultIndex}`}>
                      <Divider sx={{ my: 2 }} />
                      <Typography>
                        [{getTenseText(result.exerciseInfo.tense)}]
                      </Typography>
                      <Typography>
                        {getPronounText(result.exerciseInfo.pronoun)}
                        {' '}
                        ({result.exerciseInfo.verb})
                      </Typography>
                      <Typography color="success">
                        Resposta correta: <span className="bold">{result.exerciseInfo.conjugation.toLowerCase()}</span>
                      </Typography>
                      <Typography color={result.exerciseInfo.conjugation.toLowerCase() === result.response.toLowerCase().trim() ? 'success' : 'error'}>
                        Sua resposta: <span className="bold">{result.response.toLowerCase()}</span>
                      </Typography>
                    </Stack>
                  )) }
                </Stack>
              </AccordionDetails>
            </Accordion>
          )) }
        </Box>
        <Button onClick={() => navigate("/verb-conjugation")}>Voltar</Button>
      </Stack>
    </Box>
  )
}
