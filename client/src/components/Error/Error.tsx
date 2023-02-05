import { Container, Grid, Box } from '@mui/material'
import ErrorOutline from '@mui/icons-material/ErrorOutline'

const Error = () => {
  return (
    <Container fixed>
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={0} justifyContent='center'>
          <Grid item xs={6}>
            <p>
              <ErrorOutline />
            </p>
            <h4>Something went wrong...</h4>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Error
