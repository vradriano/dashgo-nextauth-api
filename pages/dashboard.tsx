import { GetServerSidePropsContext } from "next"
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiclient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const useCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
    <h1>Dashboard {user?.email}</h1>
    { useCanSeeMetrics && <div>Métricas</div> }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: GetServerSidePropsContext) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get('/me')
  
  console.log(response)

  return {
    props: {}
  }
})