import React from 'react';
import Desktop from './desktop/Desktop';
import Mobile from './mobile/Mobile'
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box} from '@mui/material'

function App() {
  const media = useMediaQuery('(max-width: 800px)')

  return (
    <Box>
      {media ? <Mobile/> : <Desktop/>}
    </Box>
  );
}

export default App;