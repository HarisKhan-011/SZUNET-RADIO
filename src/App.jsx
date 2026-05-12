import { useState } from 'react'
import { channels, defaultChannelId } from './data/channels'
import HeroSection from './sections/HeroSection'
import PlayerBar from './sections/PlayerBar'
import ScheduleSection from './sections/ScheduleSection'
import BlogSection from './sections/BlogSection'
import MixcloudSection from './sections/MixcloudSection'
import FooterSection from './sections/FooterSection'
import SecondRadioPage from './pages/SecondRadioPage'
import './App.css'

function LandingPage() {
  const [selectedChannelId, setSelectedChannelId] = useState(defaultChannelId)
  const [playingChannelId, setPlayingChannelId] = useState(null)

  const selectedChannel =
    channels.find((channel) => channel.id === selectedChannelId) ?? channels[0]

  function toggleChannel(channelId) {
    setSelectedChannelId(channelId)
    setPlayingChannelId((currentChannelId) =>
      currentChannelId === channelId ? null : channelId,
    )
  }

  function toggleSelectedChannel() {
    toggleChannel(selectedChannel.id)
  }

  return (
    <main className="app">
      <HeroSection
        channels={channels}
        playingChannelId={playingChannelId}
        onToggleChannel={toggleChannel}
      />
      <PlayerBar
        channel={selectedChannel}
        isPlaying={playingChannelId === selectedChannel.id}
        onTogglePlay={toggleSelectedChannel}
      />
      <ScheduleSection />
      <BlogSection />
      <MixcloudSection />
      <FooterSection />
    </main>
  )
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, '')
  const isSecondPage =
    normalizedPath === '/second-page' || window.location.hash === '#second-page'

  return isSecondPage ? <SecondRadioPage /> : <LandingPage />
}

export default App
