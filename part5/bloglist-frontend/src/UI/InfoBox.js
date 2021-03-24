/* eslint-disable react/react-in-jsx-scope */
const infoBox = ({ infoText }) => {

  return (
    <div
      className={infoText.status === 'error' ? 'block--error' : 'block--success'}
      id="infoMessageDiv"
    >
      <h3>
        {infoText.message}
      </h3>
    </div>
  );
};

export default infoBox;