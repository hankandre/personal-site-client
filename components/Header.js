import React, { PropTypes } from 'react'
import Link from 'next/link'

const links = [
  { href: '/about', text: 'About' },
  { href: '/secret', text: 'Top Secret', authRequired: true },
  { href: '/auth/sign-off', text: 'Sign Off', authRequired: true }
]

const getAllowedLinks = isAuthenticated => links
  .filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
  .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))

const Header = ({ isAuthenticated, currentUrl }) => (
  <header>
    <style jsx>{`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
      }
    `}</style>
    <Link href='/'>
      <a>
        Hank <br />
        Codes
      </a>
    </Link>
    <div>
      {getAllowedLinks(isAuthenticated).map(l => (
        <Link prefetch key={l.href} href={l.href}>
          <a>
            {l.text}
          </a>
        </Link>
      ))}
    </div>
  </header>
)

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  currentUrl: PropTypes.string.isRequired
}

export default Header
