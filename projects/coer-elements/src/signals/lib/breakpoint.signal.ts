import { signal } from '@angular/core';
import { Screen } from '../../tools/lib/screen.class';
export const breakpointSIGNAL = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(Screen?.BREAKPOINT || 'xs');