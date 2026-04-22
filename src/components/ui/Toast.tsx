import { useApp } from '../../store/AppContext';

const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast.visible) return null;

  return (
    <div className="toast-container">
      <div className="toast">{toast.message}</div>
    </div>
  );
};

export default Toast;