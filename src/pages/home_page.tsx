import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        padding: 2
      }}
    >
    	<Stack spacing={3} style={{ flex: 1 }}>
      	<Typography variant="h6">O que você quer practicar?</Typography>
        <Divider />
        <Button variant="outlined" onClick={() => navigate("/verb-conjugation")}>Conjugações verbais</Button>
      </Stack>

      <Box
      	component="footer"
      	sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          mt: 4,
          pt: 2,
          pb: "env(safe-area-inset-bottom)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      	>
        <Box
      		sx={{
            display: 'flex',
            gap: 1.5,
          }}
        >
          <Button
            fullWidth
            href="https://github.com/Jorge1701/language-frontend"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon fontSize="small"/>}
            size="small"
            variant="outlined"
            color="inherit"
            sx={{
              color: 'text.secondary',
              borderColor: 'text.disabled',
              textTransform: 'none',
              '&:hover': {
              	borderColor: 'text.secondary',
              	background: 'action.hover',
              }
            }}
          >
            Frontend
          </Button>
          <Button
            fullWidth
            href="https://github.com/Jorge1701/language-backend"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon fontSize="small"/>}
            size="small"
            variant="outlined"
            color="inherit"
            sx={{
              color: 'text.secondary',
              borderColor: 'text.disabled',
              textTransform: 'none',
              '&:hover': {
              	borderColor: 'text.secondary',
              	background: 'action.hover',
              }
            }}
          >
            Backend
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Criado por{' '}
          <Link
            href="https://www.linkedin.com/in/jorge-g-rosas-g"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jorge Rosas
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
