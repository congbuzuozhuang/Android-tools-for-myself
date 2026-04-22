import { Outlet } from 'react-router-dom';
import Header from './Header';
import Toast from '../ui/Toast';

const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};

export default AppLayout;