import { signal } from '@angular/core';
import { Screen } from '../../tools';
export const breakpointSIGNAL = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(Screen?.BREAKPOINT || 'xs');