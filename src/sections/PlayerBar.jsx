import { useState } from 'react'
import playControl from '../assets/images/Group 32.png'
import volumeIcon from '../assets/images/Group 17.png'
import bitrateBadge from '../assets/images/Group 26.png'
import onAirBadge from '../assets/images/Group 27.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import trackBadge from '../assets/images/MILEY CYRUS PRISONER.png'
import categoryBadge from '../assets/images/OLDSCHOOL (1).png'
import volumeLine from '../assets/images/Line 1.png'
import volumeKnob from '../assets/images/Ellipse 1.png'
import './PlayerBar.css'

function PlayerBar({ channel, isPlaying, onTogglePlay }) {
  const [volume, setVolume] = useState(40)

  return (
    <section className="player-section" aria-label="Now playing">
      <div className="player-shell">
        <button
          className={`player-play ${isPlaying ? 'is-playing' : ''}`}
          type="button"
          aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
          aria-pressed={isPlaying}
          onClick={onTogglePlay}
        >
          <img src={playControl} alt="" aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <img
          className="player-thumbnail"
          src={channel.portrait}
          alt={`${channel.artist} - ${channel.track}`}
        />

        <div className="player-feedback" aria-label="Track feedback">
          <button type="button" aria-label="Like this track">
            <img src={likeIcon} alt="" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Dislike this track">
            <img src={dislikeIcon} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="player-track">
          <img src={trackBadge} alt="Miley Cyrus Prisoner" />
        </div>

        <img className="on-air-badge" src={onAirBadge} alt="On air" />
        <img className="player-category" src={categoryBadge} alt="Oldschool" />

        <div className="player-volume">
          <img className="volume-icon" src={volumeIcon} alt="" aria-hidden="true" />
          <label className="volume-slider" style={{ '--volume': `${volume}%` }}>
            <span className="sr-only">Volume</span>
            <img className="volume-line" src={volumeLine} alt="" aria-hidden="true" />
            <img className="volume-knob" src={volumeKnob} alt="" aria-hidden="true" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(event.target.value)}
            />
          </label>
          <img className="bitrate-badge" src={bitrateBadge} alt="192kB/s" />
        </div>
      </div>
    </section>
  )
}

export default PlayerBar
