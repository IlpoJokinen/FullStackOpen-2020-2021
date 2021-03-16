const infoBox = ({ text }) => {

  return (
    <div className={text.status === 'error' ? "block--error" : "block--success"}>
      <h3>
        {text.message}
      </h3>
    </div>
  );
};

export default infoBox;