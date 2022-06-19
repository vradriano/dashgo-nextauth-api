import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { parseCookies } from 'nookies'
import { withSSRGuest } from '../utils/withSSRGuest'

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function onHandleClick(event: FormEvent) {
    event.preventDefault()


    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <form onSubmit={onHandleClick}>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <input onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default Home

