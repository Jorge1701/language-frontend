import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 4, py: 5 }}>
    	<Stack spacing={3}>
      	<Typography variant="h6">O que você quer practicar?</Typography>
        <Divider />
        <Button variant="outlined" onClick={() => navigate("/verb-conjugation")}>Conjugações verbais</Button>
      </Stack>
    </Box>
  )
}
