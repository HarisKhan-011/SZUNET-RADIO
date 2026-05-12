import { brandAssets } from '../data/channels'
import './ChannelCard.css'

function ChannelCard({ channel, isPlaying, onToggle }) {
  return (
    <article
      className={`channel-card channel-card--${channel.size} ${
        isPlaying ? 'is-playing' : ''
      }`}
    >
      <img
        className="channel-portrait"
        src={channel.portrait}
        alt={`${channel.artist} - ${channel.track}`}
      />

      <div className="track-copy">
        <span>{channel.artist}</span>
        <strong>{channel.track}</strong>
      </div>

      <button
        className="play-button"
        type="button"
        aria-label={`${isPlaying ? 'Pause' : 'Play'} ${channel.title} radio`}
        aria-pressed={isPlaying}
        onClick={() => onToggle(channel.id)}
      >
        <img src={channel.playIcon} alt="" aria-hidden="true" />
        <span className="pause-mark" aria-hidden="true" />
      </button>

      <footer className="station-panel">
        <img className="panel-bg" src={channel.panel} alt="" />
        <div className="station-lockup">
          <img src={brandAssets.stationLogo} alt="SZUNET Radio" />
          {channel.label && <img src={channel.label} alt={channel.title} />}
        </div>
      </footer>
    </article>
  )
}

export default ChannelCard
