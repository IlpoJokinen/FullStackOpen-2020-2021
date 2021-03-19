const infoBox = ({ infoText }) => {

  return (
    <div className={infoText.status === 'error' ? "block--error" : "block--success"}>
      <h3>
        {infoText.message}
      </h3>
    </div>
  );
};

export default infoBox;