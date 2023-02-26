import { createContextId, ContextId } from '@builder.io/qwik';
import type { ThemePreference } from './components/theme-toggle/theme-toggle';

export interface GenericType {
  ...
}

export const QwikCityContext = createContextId<GenericType>(name: string): ContextId<GenericType>;