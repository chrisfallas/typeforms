import { createContext, useContext } from 'react';
import { TypeFormsSettings } from '../types/Settings';

const SettingsContext = createContext<TypeFormsSettings | null>(null);

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContext;
