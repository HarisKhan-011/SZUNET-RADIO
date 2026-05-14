import { useEffect, useRef, useState } from 'react'
import ChannelCard from '../components/ChannelCard'
import brandLogo from '../assets/images/Group 2.png'
import headline from '../assets/images/KIMAXOLJUK A NAPODAT!.png'
import redRibbon from '../assets/images/Rectangle 19.png'

function HeroSection({ channels, playingChannelId, onNavigateArchive, onToggleChannel }) {
  const channelStripRef = useRef(null)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroComplete(true), 1500)
    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (!introComplete) return

    const strip = channelStripRef.current
    if (!strip || !window.matchMedia('(max-width: 760px)').matches) return

    const featureCard = strip.querySelector('[data-channel-id="prime"]')
    featureCard?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [introComplete])

  return (
    <section
      className="relative isolate h-[calc(100svh-var(--player-height))] min-h-[560px] overflow-hidden px-5 max-[760px]:min-h-[calc(100svh-var(--player-height))] max-[760px]:overflow-hidden max-[760px]:px-3"
      aria-label="SZUNET Radio landing page"
    >
      <div
        className="absolute inset-x-0 top-0 z-10 h-1.5 bg-[#080833]"
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[min(90vw,1000px)] object-fill object-right-top max-[760px]:left-[110px] max-[760px]:right-auto max-[760px]:w-[680px] max-[420px]:left-[74px] max-[420px]:w-[600px]"
        src={redRibbon}
        alt=""
        aria-hidden="true"
      />

      <header className="absolute left-1/2 top-[clamp(10px,1.7vw,18px)] z-[3] flex w-[var(--page-width)] -translate-x-1/2 items-start justify-between gap-6">
        <img
          className="h-auto w-[clamp(118px,11vw,154px)] transition-[opacity,transform] duration-500"
          src={brandLogo}
          alt="SZUNET Radio"
        />
        <button
          className="mt-1 cursor-pointer border-0 bg-transparent p-0 text-[clamp(13px,1.1vw,18px)] font-extrabold leading-none text-[#020202] no-underline max-[420px]:text-[12px]"
          type="button"
          onClick={onNavigateArchive}
        >
          @ dalkereses
        </button>
      </header>

      <img
        className="pointer-events-none absolute right-[clamp(26px,3.4vw,52px)] top-[clamp(58px,7.3vw,82px)] z-[4] h-auto w-[clamp(286px,34vw,470px)] max-[760px]:right-5 max-[760px]:top-[76px] max-[760px]:w-[min(62vw,320px)] max-[420px]:top-[88px] max-[420px]:w-[250px]"
        src={headline}
        alt="Kimaxoljuk a napodat!"
      />

      <div
        className="absolute bottom-0 left-1/2 z-[2] flex w-[var(--page-width)] -translate-x-1/2 items-end justify-center gap-[clamp(9px,0.8vw,10px)] max-[760px]:inset-x-0 max-[760px]:bottom-[10px] max-[760px]:w-full max-[760px]:translate-x-0 max-[760px]:snap-x max-[760px]:snap-mandatory max-[760px]:justify-start max-[760px]:gap-4 max-[760px]:overflow-x-auto max-[760px]:overscroll-x-contain max-[760px]:px-3 max-[760px]:scroll-smooth max-[760px]:[scroll-padding-inline:12px] max-[760px]:[scrollbar-width:none] max-[760px]:[&::-webkit-scrollbar]:hidden"
        aria-label="Radio channels"
        ref={channelStripRef}
      >
        {channels.map((channel, index) => (
          <div className="contents" data-channel-id={channel.id} key={channel.id}>
            <ChannelCard
              channel={channel}
              index={index}
              introActive={!introComplete}
              isPlaying={playingChannelId === channel.id}
              onToggle={onToggleChannel}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--player-height)+4px)] z-[4] mx-auto h-[2px] w-[min(720px,72vw)] overflow-hidden rounded-full bg-white/35 opacity-0 shadow-[0_0_18px_rgba(255,255,255,0.34)] [animation:hero-loader_1.5s_ease-out_0s_1_both] max-[760px]:bottom-[calc(var(--player-height)+16px)] max-[760px]:w-[66vw]"
        aria-hidden="true"
      >
        <span className="block h-full w-full origin-left bg-[#ff1111] [animation:hero-loader-fill_1.5s_cubic-bezier(.2,.8,.2,1)_0s_1_both]" />
      </div>
    </section>
  )
}

export default HeroSection
