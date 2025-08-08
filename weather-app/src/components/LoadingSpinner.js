import { Loader } from 'lucide-react';
// import '../styles/LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <Loader size={40} className="spinner" />
    </div>
  );
}