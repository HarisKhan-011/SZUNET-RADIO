import {
  bottomMixcloudItems,
  topMixcloudItems,
} from '../data/mixcloudItems'
import mixcloudLogo from '../assets/images/Group 85.png'
import vectorShape from '../assets/images/Vector.png'
import playIcon from '../assets/images/Group 28.png'
import likeIcon from '../assets/images/Group 41.png'
import dislikeIcon from '../assets/images/Group 42.png'
import './MixcloudSection.css'

function MixcloudCard({ item, variant = 'top' }) {
  return (
    <article
      className={`mixcloud-card mixcloud-card--${variant} ${
        item.active ? 'mixcloud-card--active' : ''
      }`}
    >
      <img
        className="mixcloud-card-image"
        src={item.image}
        alt={item.label ?? `${item.title} ${item.subtitle ?? ''}`.trim()}
        style={{ objectPosition: item.imagePosition }}
      />

      <button
        className="mixcloud-play"
        type="button"
        aria-label={`Play ${item.title}`}
      >
        <img src={playIcon} alt="" aria-hidden="true" />
      </button>

      {item.showVotes && (
        <div className="mixcloud-votes" aria-hidden="true">
          <img src={likeIcon} alt="" />
          <img src={dislikeIcon} alt="" />
        </div>
      )}

      <div className="mixcloud-card-copy">
        {item.eyebrow && <span>{item.eyebrow}</span>}
        {item.label ? (
          <strong className="mixcloud-chart-label">{item.label}</strong>
        ) : (
          <>
            <h2>{item.title}</h2>
            {item.subtitle && <strong>{item.subtitle}</strong>}
          </>
        )}
      </div>
    </article>
  )
}

function MixcloudSection() {
  return (
    <section className="mixcloud-section" aria-label="Mixcloud">
      <img className="mixcloud-vector" src={vectorShape} alt="" aria-hidden="true" />

      <div className="mixcloud-inner">
        <div className="mixcloud-row mixcloud-row--top">
          {topMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} />
          ))}
        </div>

        <div className="mixcloud-middle">
          <img className="mixcloud-logo" src={mixcloudLogo} alt="Mixcloud" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis.
          </p>
        </div>

        <div className="mixcloud-row mixcloud-row--bottom">
          {bottomMixcloudItems.map((item) => (
            <MixcloudCard item={item} key={item.id} variant="bottom" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MixcloudSection
