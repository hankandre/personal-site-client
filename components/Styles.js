import React from 'react';

export const changeHue = (p, c0, c1) => {
  var n = p < 0 ? p * -1 : p,
    u = Math.round,
    w = parseInt;
  if (c0.length > 7) {
    var f = c0.split(','),
      t = (c1 ? c1 : p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)').split(','),
      R = w(f[0].slice(4)),
      G = w(f[1]),
      B = w(f[2]);
    return (
      'rgb(' +
      (u((w(t[0].slice(4)) - R) * n) + R) +
      ',' +
      (u((w(t[1]) - G) * n) + G) +
      ',' +
      (u((w(t[2]) - B) * n) + B) +
      ')'
    );
  } else {
    var f = w(c0.slice(1), 16),
      t = w((c1 ? c1 : p < 0 ? '#000000' : '#FFFFFF').slice(1), 16),
      R1 = f >> 16,
      G1 = (f >> 8) & 0x00ff,
      B1 = f & 0x0000ff;
    return (
      '#' +
      (0x1000000 +
        (u(((t >> 16) - R1) * n) + R1) * 0x10000 +
        (u((((t >> 8) & 0x00ff) - G1) * n) + G1) * 0x100 +
        (u(((t & 0x0000ff) - B1) * n) + B1))
        .toString(16)
        .slice(1)
    );
  }
};
export const tertiaryColor = changeHue(-0.15, '#6BE5F2');
export const secondaryColor = '#F22987';

export default () =>
  <style global jsx>{`
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500');
    @font-face {
      font-family: 'Futura';
      src: url('../assets/fonts/Futura.eot');
      src: url('../assets/fonts/Futura.woff2') format('woff2'),
        url('../assets/fonts/Futura.woff') format('woff'),
        url('../assets/fonts/Futura.ttf') format('truetype'),
        url('../assets/fonts/Futura.svg#Futura') format('svg'),
        url('../assets/fonts/Futura.eot?#iefix') format('embedded-opentype');
      font-weight: normal;
      font-style: normal;
    }

    html,
    body {
      width: 100%;
      height: 100%;
    }

    html {
      font-size: 12px;
    }

    body {
      color: rgba(0, 0, 0, .8);
      font-family: 'Futura', 'Helvetica Neue', Helvetica, sans-serif;
    }

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    h4 {
      font-size: 1.166666667rem;
    }

    blockquote {
      font-size: 2rem;
    }

    a {
      text-decoration: none;
      color: ${secondaryColor};
      transition: color 200ms;
    }

    a:hover {
      color: ${changeHue(0.15, secondaryColor)};
    }
  `}</style>;
