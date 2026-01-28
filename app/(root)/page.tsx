import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import Rightsidebar from '@/components/Rightsidebar'

const Home = () => {
  const loggedIn = {firstName: 'Adrian', lastName: 'JSM', email: '@epicc'}
  return (
    <section className = "home">
      <div className = "home-content">
        <header className = "home-header">
          <HeaderBox 
            type = "greeting"
            title = "Welcome"
            user = {loggedIn?.firstName || 'Guest'}
            subtext = "Acces and manage your transaction efficiently"
          />

          <TotalBalanceBox 
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {1250.25}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

    <Rightsidebar 
      user = {loggedIn}
      transactions = {[]}
      banks = {[{currentBalance: 1222}, {$id: '2'}]}

    />
    </section>
  )
}

export default Home