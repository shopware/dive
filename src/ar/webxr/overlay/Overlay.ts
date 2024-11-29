export class Overlay {
    private _element: HTMLDivElement;
    public get Element(): HTMLDivElement {
        return this._element;
    }

    private _closeButton: SVGSVGElement;
    public get CloseButton(): SVGSVGElement {
        return this._closeButton;
    }

    constructor() {
        // create div
        this._element = document.createElement('div');

        // create and append close button to overlay
        this._closeButton = this.createCloseButton();
        this._element.appendChild(this._closeButton);

        // append overlay to body
        document.body.appendChild(this._element);
    }

    private createCloseButton(): SVGSVGElement {
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

        // append path to svg
        svg.appendChild(path);

        return svg;
    }
}