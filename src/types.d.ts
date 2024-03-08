// * COMPONENT COLORS
export interface ColorState {
	default: string;
	hover: string
}

export type ComponentVariant = 'success' | 'error' | 'wraning' | 'info'

export type ColorConfig = Record<ComponentVariant, ColorState>