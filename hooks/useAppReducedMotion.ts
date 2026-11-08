import { useReducedMotion } from 'react-native-reanimated';
import { useApp } from '@/context/AppContext';

export function useAppReducedMotion() {
  const systemReducedMotion = useReducedMotion();
  const { preferences, ready } = useApp();
  return !ready || preferences.reducedMotion || systemReducedMotion;
}
