import { useState } from 'react';
import Onboarding, { IntroScreen } from './components/Onboarding';
import Dashboard from './components/Dashboard';

type Screen = 'onboarding' | 'intro' | 'dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={() => setCurrentScreen('intro')} />
      )}
      {currentScreen === 'intro' && (
        <IntroScreen onStart={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard />
      )}
    </div>
  );
}
