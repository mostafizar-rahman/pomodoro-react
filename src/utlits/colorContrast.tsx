export function setContrastTextColor(element: HTMLElement) {
    let backgroundColor = getComputedStyle(element).getPropertyValue('--background').trim();

    if (backgroundColor.startsWith('#')) {
        const hex = backgroundColor.slice(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return;

    const [r, g, b] = rgb.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#151932' : '#F3F4F6';

    element.style.color = textColor;
};
