import "./Overlay.scss";

function Overlay({ message }) {
  return (
    <div className="overlay">
      <p className="overlay__message">{message}</p>
    </div>
  );
}

export default Overlay;
