import '../styles/ErrorMessage.css';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
    </div>
  );
}
