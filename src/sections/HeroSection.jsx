import ChannelCard from '../components/ChannelCard'
import brandLogo from '../assets/images/Group 2.png'
import headline from '../assets/images/KIMAXOLJUK A NAPODAT!.png'
import redRibbon from '../assets/images/Rectangle 19.png'
import './HeroSection.css'

function HeroSection({ channels, playingChannelId, onToggleChannel }) {
  return (
    <section className="landing" aria-label="SZUNET Radio landing page">
      <div className="top-lines" aria-hidden="true" />
      <img className="red-ribbon" src={redRibbon} alt="" aria-hidden="true" />

      <header className="masthead">
        <img className="brand-logo" src={brandLogo} alt="SZUNET Radio" />
        <span className="social-link">@ dalkereses</span>
      </header>

      <img className="headline" src={headline} alt="Kimaxoljuk a napodat!" />

      <div className="channel-row" aria-label="Radio channels">
        {channels.map((channel) => (
          <ChannelCard
            channel={channel}
            isPlaying={playingChannelId === channel.id}
            key={channel.id}
            onToggle={onToggleChannel}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
