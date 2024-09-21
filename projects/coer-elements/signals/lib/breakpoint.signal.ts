import { signal } from '@angular/core';
import { Screen } from 'coer-elements/tools';
export const breakpointSIGNAL = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(Screen?.BREAKPOINT || 'xs');