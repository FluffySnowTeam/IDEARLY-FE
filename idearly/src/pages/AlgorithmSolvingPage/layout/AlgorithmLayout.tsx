import { Outlet } from 'react-router-dom'
import { AlgorithmNav } from '../components'

const AlgorithmLayout = () => {
  return (
    <>
      <AlgorithmNav />
      <Outlet />
    </>
  )
}

export default AlgorithmLayout
