import footerHeadline from '../assets/images/KIMAXOLJUK A NAPODAT! (1).png'
import footerBackground from '../assets/images/Rectangle 6.png'
import stationLogo from '../assets/images/Szünet logo.png'
import './FooterSection.css'

function FooterSection() {
  return (
    <footer className="site-footer" aria-label="SZUNET Radio footer">
      <img className="footer-bg" src={footerBackground} alt="" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-callout">
          <img src={footerHeadline} alt="Kimaxoljuk a napodat!" />
        </div>

        <div className="footer-meta">
          <img className="footer-logo" src={stationLogo} alt="SZUNET Radio" />

          <p>
            Készítette: McG012. Szép volt minden zene/tartalom itt csak
            megjelenítésre. Minden jog fenntartva.
          </p>

          <p>Copyright © Szünet Rádió 2026 - Minden jog fenntartva.</p>
        </div>
      </div>

      <div className="footer-stripe" aria-hidden="true" />
    </footer>
  )
}

export default FooterSection
