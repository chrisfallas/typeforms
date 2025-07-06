import { PropsWithChildren } from 'react';
import SettingsContext from '../contexts/SettingsContext';
import { TypeFormsSettings } from '../types/Settings';

export interface SettingsProviderProps {
  settings: TypeFormsSettings;
}

const SettingsProvider = (props: PropsWithChildren<SettingsProviderProps>) => {
  const { children, settings } = props;

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
