export class CloseButton {
    public static Create(session: XRSession | null, autoAppend: boolean = false): HTMLDivElement {
        const overlay = document.createElement('div');
        overlay.style.display = 'none';

        // create svg path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 12,12 L 28,28 M 28,12 12,28');
        path.setAttribute('stroke', '#fff');
        path.setAttribute('stroke-width', "2");

        // create svg
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '38');
        svg.setAttribute('height', '38');
        svg.style.position = 'absolute';
        svg.style.right = '20px';
        svg.style.top = '20px';
        svg.addEventListener('click', () => {
            if (!session) return;
            session.end();
        });
        // append path to svg
        svg.appendChild(path);

        // append svg to overlay
        overlay.appendChild(svg);

        if (autoAppend) document.body.appendChild(overlay);

        return overlay;
    }
}