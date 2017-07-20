import React from 'react';
import Styles from '../components/Styles';
import Sidebar from '../components/Sidebar';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false
    };
  }

  handleClick() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const { active } = this.state;
    return (
      <section>
        <style jsx>{`
          main {
            position: relative;
            top: 4rem;
            transition: top 200ms;
          }
          main.active {
            top: 8rem;
          }
        `}</style>
        <Styles />
        <Sidebar handleClick={this.handleClick} active={active} />
        <main className={active ? 'active' : null}>
          <h1>Hello</h1>
        </main>
      </section>
    );
  }
}
