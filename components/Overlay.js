export default props => {
  return (
    <div className="container">
      <style jsx>{`
        .container {
        }
      `}</style>
      {props.children}
    </div>
  );
};
