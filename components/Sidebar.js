import React, { Component } from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';
import { changeHue, tertiaryColor } from './Styles';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active, handleClick } = this.props;
    return (
      <nav className={active ? 'active' : null}>
        <style jsx>{`
          nav {
            position: fixed;
            z-index: 25;
            box-sizing: border-box;
            line-height: 1;
            width: 100vw;
            height: 8rem;
            top: -4rem;
            left: 0;
            transition: right 250ms;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            background-color: rgba(0, 0, 0, .15);
            transition: top 200ms;
          }

          nav.active {
            top: 0;
          }
          ul {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: space-around;
            font-family: 'Roboto Mono', Courier, monospace;
          }

          li {
            margin-left: 1.25rem;
          }

          li:first-of-type {
            margin-left: unset;
          }

          li h3 {
            margin-top: 0;
          }

          h3 {
            font-size: 2rem;
            color: ${tertiaryColor};
            cursor: pointer;
            margin-bottom: .75rem;
            transition: color 200ms;
          }

          h3:hover {
            color: ${changeHue(-0.15, tertiaryColor)};
          }
        `}</style>
        <ul>
          {NavLinks.map((link, index) => {
            return (
              <li key={index.toString()}>
                <h4>
                  <Link
                    href={link.url}
                    prefetch={link.prefetch ? link.prefetch : false}>
                    <a title={link.title}>
                      {link.name}
                    </a>
                  </Link>
                </h4>
              </li>
            );
          })}
        </ul>
        <h3 href="javascript:void(0);" onClick={handleClick}>
          menu
        </h3>
      </nav>
    );
  }
}
