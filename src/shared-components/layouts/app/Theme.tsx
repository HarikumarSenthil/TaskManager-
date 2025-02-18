"use client";
import { ThemeConfig } from '@/config/types';

type ThemeProps = {
    themeConfig?: ThemeConfig;
};

const Theme = ({ themeConfig }: ThemeProps): JSX.Element => {
    let { colors, fontSize, lineHeight, fontFamily } = themeConfig?.style;

    return (
        <style jsx global>
            {`
                body,
                html {

                    --color-text-primary: ${colors['text-primary']};
                    --color-text-secondary: ${colors['text-secondary']};
                    --color-text-error: ${colors['text-error']};
                    --color-text-process: ${colors['text-process']};
                    --color-text-success: ${colors['text-success']};
                    --color-text-title: ${colors['text-title']};
                    --color-text-disable: ${colors['text-disable']};
                    --color-text-label: ${colors['text-label']};
                    --color-text-sick: ${colors['text-sick']};
                    --color-text-privilege: ${colors['text-privilege']};
                    --color-text-maternity: ${colors['text-maternity']};
                    --color-text-paternity: ${colors['text-paternity']};
                    --color-text-lop: ${colors['text-lop']};

                    --color-background-primary: ${colors['background-primary']};
                    --color-background-selected: ${colors['background-selected']};
                    --color-background-sick: ${colors['background-sick']};
                    --color-background-privilege: ${colors['background-privilege']};
                    --color-background-maternity: ${colors['background-maternity']};
                    --color-background-paternity: ${colors['background-paternity']};
                    --color-background-lop: ${colors['background-lop']};
                    --color-background-casual: ${colors['background-casual']};

                    --color-placeholder-primary: ${colors['placeholder-primary']};

                    --color-border-primary: ${colors['border-primary']};
                    --color-border-dark: ${colors['border-dark']};
                    --color-border-light: ${colors['border-light']};
                    --color-border-error: ${colors['border-error']};
                    --color-border-success: ${colors['border-success']};
                    --color-border-sick: ${colors['border-sick']};
                    --color-border-privilege: ${colors['border-privilege']};
                    --color-border-maternity: ${colors['border-maternity']};
                    --color-border-paternity: ${colors['border-paternity']};
                    --color-border-lop: ${colors['border-lop']};

                    --size-font-2xs: ${fontSize['2xs']};
                    --size-font-xs: ${fontSize.xs};
                    --size-font-sm: ${fontSize.sm};
                    --size-font-base: ${fontSize.base};
                    --size-font-lg: ${fontSize.lg};
                    --size-font-xl: ${fontSize.xl};
                    --size-font-2xl: ${fontSize['2xl']};

                    --line-height-2xs: ${lineHeight['2xs']};
                    --line-height-xs: ${lineHeight.xs};
                    --line-height-sm: ${lineHeight.sm};
                    --line-height-base: ${lineHeight.base};
                    --line-height-lg: ${lineHeight.lg};
                    --line-height-xl: ${lineHeight.xl};
                    --line-height-2xl: ${lineHeight['2xl']};

                    --font-family-regular: ${fontFamily['family-regular']};
                    --font-family-semi-bold: ${fontFamily['family-semi-bold']};
                    --font-family-medium: ${fontFamily['family-medium']};
                    --family-bold: ${fontFamily['family-bold']};
                    --font-family-sans: ${fontFamily.sans};
                    --font-family-serif: ${fontFamily.serif};
                    --font-family-mono: ${fontFamily.mono};
                }
            `}
        </style>
    );
};

export default Theme;
