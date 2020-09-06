import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/nataliaMarzec/combapp" target="_blank" rel="noopener noreferrer">Combapp</a>
        <span className="ml-1">&copy; 2020 copyrigth</span>
      </div>
   
    </CFooter>
  )
}

export default React.memo(TheFooter)
