import { useState } from 'react'
import GitLogo from '../assets/github.png'
import Input from '../components/input'
import Button from '../components/button'
import ItemRepo from '../components/itemRepo'
import { api } from '../services/api'

import { Container } from './styles'

function App() {

  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const {data} = await api.get(`https://api.github.com/repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data])
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório já listado.')
    
  } 

  const handleRemoveRepo = (id) => {
  
    const newRepos = repos.filter((repo) => repo.id !== id)
    setRepos(newRepos)
  }

  return (
    <Container>
      <img src={GitLogo} width={72} height={72} alt='Github Logo'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepos={handleRemoveRepo} repo={repo}/>)}
      
    </Container>
  );
}

export default App;
