import Overlay from './Overlay';

export default () => {
  return (
    <div>
      <style jsx>{`
        div {
          height: calc(100vh - 8rem);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        h1 {
          font-size: 16rem;
        }
      `}</style>
      <Overlay color="white" ontop style={{ overflow: 'hidden' }}>
        <img
          src="//cldup.com/YRNKhRMcEz.jpg"
          alt="Me sipping some coffee"
          style={{
            transform: 'rotate(90deg)',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </Overlay>
    </div>
  );
};
