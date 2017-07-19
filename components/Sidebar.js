import React, { Component } from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  render() {
    const { opened } = this.state;
    return (
      <nav className={opened ? 'active' : null}>
        <style jsx>{`
          nav {
            position: fixed;
            box-sizing: border-box;
            line-height: 1;
            width: 100vw;
            height: 2rem;
            top: 0;
            left: 0;
            transition: right 250ms;
          }

          nav.active {
            top: 0;
          }
          ul {
            list-style: none;
          }
        `}</style>
        <ul>
          {NavLinks.map(link => {
            return (
              <li>
                <Link href={link.url}>
                  <a title={link.title}>
                    {link.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
