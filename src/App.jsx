import { useEffect, useMemo, useRef, useState } from 'react'
import { channels, defaultChannelId } from './data/channels'
import HeroSection from './sections/HeroSection'
import PlayerBar from './sections/PlayerBar'
import ScheduleSection from './sections/ScheduleSection'
import BlogSection from './sections/BlogSection'
import MixcloudSection from './sections/MixcloudSection'
import FooterSection from './sections/FooterSection'
import SecondRadioPage from './pages/SecondRadioPage'
import blueRing from './assets/images/Ellipse 5.png'

function getInitialView() {
  const normalizedPath = window.location.pathname.replace(/\/$/, '')
  return normalizedPath === '/second-page' || window.location.hash === '#second-page'
    ? 'archive'
    : 'home'
}

function LandingPage({ playingChannelId, onNavigateArchive, onToggleChannel }) {
  return (
    <>
      <HeroSection
        channels={channels}
        playingChannelId={playingChannelId}
        onNavigateArchive={onNavigateArchive}
        onToggleChannel={onToggleChannel}
      />
      <div className="relative isolate overflow-hidden bg-white">
        <img
          className="pointer-events-none absolute top-[clamp(96px,9vw,152px)] right-[clamp(-470px,-24vw,-235px)] z-0 w-[clamp(600px,58vw,890px)] max-w-none opacity-[0.96] max-[1180px]:top-[138px] max-[1180px]:right-[-370px] max-[1180px]:w-[620px] max-[1180px]:opacity-[0.72] max-[900px]:top-[168px] max-[900px]:right-[-390px] max-[900px]:w-[520px] max-[900px]:opacity-[0.52] max-[760px]:top-[188px] max-[760px]:right-[-335px] max-[760px]:w-[430px] max-[760px]:opacity-[0.48] max-[560px]:top-[168px] max-[560px]:right-[-338px] max-[560px]:w-[420px] max-[560px]:opacity-[0.42] max-[420px]:top-[168px] max-[420px]:right-[-290px] max-[420px]:w-[350px] max-[380px]:right-[-270px] max-[380px]:w-[330px]"
          src={blueRing}
          alt=""
          aria-hidden="true"
        />
        <div className="relative z-[1]">
          <ScheduleSection />
          <BlogSection />
          <MixcloudSection />
        </div>
      </div>
      <FooterSection />
    </>
  )
}

function App() {
  const [selectedChannelId, setSelectedChannelId] = useState(defaultChannelId)
  const [playingChannelId, setPlayingChannelId] = useState(null)
  const [view, setView] = useState(getInitialView)
  const [streamByChannel, setStreamByChannel] = useState(() =>
    Object.fromEntries(channels.map((channel) => [channel.id, channel.streams[0].id])),
  )
  const [volume, setVolume] = useState(40)
  const audioRef = useRef(null)
  const isStartingPlaybackRef = useRef(false)

  const selectedChannel =
    channels.find((channel) => channel.id === selectedChannelId) ?? channels[0]
  const selectedStreamId = streamByChannel[selectedChannel.id] ?? selectedChannel.streams[0].id
  const selectedStream =
    selectedChannel.streams.find((stream) => stream.id === selectedStreamId) ??
    selectedChannel.streams[0]

  const selectedChannelName = selectedChannel.playerName ?? selectedChannel.title.toUpperCase()

  const isPlaying = playingChannelId === selectedChannel.id

  const playerChannel = useMemo(
    () => ({
      ...selectedChannel,
      currentStream: selectedStream,
      playerName: selectedChannelName,
    }),
    [selectedChannel, selectedChannelName, selectedStream],
  )

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.muted = volume === 0
    }
  }, [volume])

  useEffect(() => {
    if (!audioRef.current || isPlaying) return

    if (audioRef.current.src !== selectedStream.url) {
      audioRef.current.src = selectedStream.url
    }
  }, [isPlaying, selectedStream.url])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function syncPausedState() {
      if (isStartingPlaybackRef.current) return
      setPlayingChannelId(null)
    }

    audio.addEventListener('pause', syncPausedState)
    audio.addEventListener('ended', syncPausedState)
    audio.addEventListener('error', syncPausedState)

    return () => {
      audio.removeEventListener('pause', syncPausedState)
      audio.removeEventListener('ended', syncPausedState)
      audio.removeEventListener('error', syncPausedState)
    }
  }, [])

  useEffect(() => {
    function handlePopState() {
      setView(getInitialView())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(nextView) {
    setView(nextView)
    const nextUrl = nextView === 'archive' ? '/second-page' : '/'
    window.history.pushState({ view: nextView }, '', nextUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function startChannel(channelId) {
    setSelectedChannelId(channelId)
    setPlayingChannelId(channelId)

    const nextChannel = channels.find((channel) => channel.id === channelId) ?? channels[0]
    const nextStreamId = streamByChannel[nextChannel.id] ?? nextChannel.streams[0].id
    const nextStream =
      nextChannel.streams.find((stream) => stream.id === nextStreamId) ?? nextChannel.streams[0]

    if (audioRef.current) {
      isStartingPlaybackRef.current = true
      if (audioRef.current.src !== nextStream.url) {
        audioRef.current.src = nextStream.url
      }
      try {
        await audioRef.current.play()
      } catch {
        setPlayingChannelId(null)
      } finally {
        isStartingPlaybackRef.current = false
      }
    }
  }

  function pausePlayback() {
    audioRef.current?.pause()
    setPlayingChannelId(null)
  }

  function toggleChannel(channelId) {
    if (playingChannelId === channelId) {
      pausePlayback()
      return
    }

    startChannel(channelId)
  }

  function toggleSelectedChannel() {
    if (isPlaying) {
      pausePlayback()
      return
    }

    startChannel(selectedChannel.id)
  }

  function changeStream(streamId) {
    setStreamByChannel((current) => ({
      ...current,
      [selectedChannel.id]: streamId,
    }))

    const nextStream =
      selectedChannel.streams.find((stream) => stream.id === streamId) ??
      selectedChannel.streams[0]

    if (isPlaying && audioRef.current) {
      isStartingPlaybackRef.current = true
      if (audioRef.current.src !== nextStream.url) {
        audioRef.current.src = nextStream.url
      }
      audioRef.current
        .play()
        .catch(() => setPlayingChannelId(null))
        .finally(() => {
          isStartingPlaybackRef.current = false
        })
    }
  }

  return (
    <main className="[--page-width:min(1448px,calc(100vw-40px))] [--player-height:52px] min-h-[100svh] overflow-x-hidden bg-white pb-[var(--player-height)] max-[700px]:[--page-width:calc(100vw-24px)] max-[700px]:[--player-height:86px]">
      <audio ref={audioRef} preload="none" />
      {view === 'archive' ? (
        <SecondRadioPage onNavigateHome={() => navigate('home')} />
      ) : (
        <LandingPage
          playingChannelId={playingChannelId}
          onNavigateArchive={() => navigate('archive')}
          onToggleChannel={toggleChannel}
        />
      )}
      <PlayerBar
        channel={playerChannel}
        isPlaying={isPlaying}
        selectedStreamId={selectedStreamId}
        streams={selectedChannel.streams}
        volume={volume}
        onChangeStream={changeStream}
        onChangeVolume={setVolume}
        onTogglePlay={toggleSelectedChannel}
      />
    </main>
  )
}

export default App
