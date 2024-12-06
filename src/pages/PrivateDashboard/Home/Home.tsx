import Box from '@mui/material/Box'
import dashboard from '../../../assets/img/dashboard.png'
import dashboardHover from '../../../assets/img/dashboardHover.png'

function Home() {

  return (
    <Box
    sx={{
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <img
      src={dashboard}
      alt="dashboard"
      style={{ maxHeight: '400px' }}
      onMouseEnter={e => e.currentTarget.src = dashboardHover}
      onMouseLeave={e => e.currentTarget.src = dashboard}
    />

  </Box>
  )
}
export default Home