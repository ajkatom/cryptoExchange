import { useEffect } from 'react';
import { Footer, Home, NavBar, Services, Transactions, Loader } from './components';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Home />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
