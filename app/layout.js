import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Provider from '../components/Provider'
export const metadata = {
  title: 'Twizzle',
  description: 'Discover creative prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>

          <main className='app'>
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
