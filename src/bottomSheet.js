// src/bottomSheet.js
import Hammer from "hammerjs";

class BottomSheet {
    constructor(options = {}) {
        this.bottomSheetId = options.bottomSheetId || 'bottomSheet';
        this.sheetId = options.sheetId || 'sheet';
        this.sheetContentId = options.sheetContentId || 'sheetContent';
        this.openButtonId = options.openButtonId || 'openButton';

        this.bottomSheet = document.getElementById(this.bottomSheetId);
        this.sheet = document.getElementById(this.sheetId);
        this.sheetContent = document.getElementById(this.sheetContentId);
        this.openButton = document.getElementById(this.openButtonId);

        this.startY = 0;
        this.startHeight = 0;
        this.sheetHeight = 0;

        this.init();
    }

    init() {
        if (this.openButton) {
            this.openButton.addEventListener('click', () => this.openSheet());
        }
        this.bottomSheet.addEventListener('click', (e) => {
            if (e.target === this.bottomSheet) {
                this.closeSheet();
            }
        });

        this.initHammer();
        window.addEventListener('resize', () => this.setSheetHeight());
    }

    setSheetHeight() {
        const maxHeight = window.innerHeight - 100; // 100px from top
        this.sheetHeight = Math.min(this.sheetContent.scrollHeight + 50, maxHeight); // 50px for the handle
        this.sheet.style.height = `${this.sheetHeight}px`;
    }

    openSheet() {
        this.bottomSheet.classList.remove('hidden');
        this.setSheetHeight();
        requestAnimationFrame(() => {
            this.bottomSheet.style.opacity = '1';
            this.sheet.style.transform = 'translateY(0)';
        });
    }

    closeSheet() {
        this.sheet.style.transform = `translateY(${this.sheetHeight}px)`;
        this.bottomSheet.style.opacity = '0';

        setTimeout(() => {
            this.bottomSheet.classList.add('hidden');
            this.sheet.style.transform = 'translateY(100%)';
        }, 300);
    }

    initHammer() {
        const hammer = new Hammer(this.sheet);

        hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

        hammer.on('panstart', (e) => {
            this.startY = e.center.y;
            this.startHeight = this.sheet.offsetHeight;
            this.sheet.classList.remove('sheet-transition');
        });

        hammer.on('pan', (e) => {
            const deltaY = e.center.y - this.startY;
            const newHeight = Math.max(50, this.startHeight - deltaY);
            this.sheet.style.height = `${newHeight}px`;

            // Gradually reduce the opacity of the background
            const opacity = Math.max(0, 1 - (deltaY / this.startHeight));
            this.bottomSheet.style.opacity = opacity.toString();

            if (e.isFinal) {
                this.sheet.classList.add('sheet-transition');
                if (deltaY > 50 || newHeight < this.sheetHeight / 2) {
                    this.closeSheet();
                } else {
                    this.setSheetHeight();
                    this.sheet.style.transform = 'translateY(0)';
                    this.bottomSheet.style.opacity = '1';
                }
            }
        });
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.sheetContent.innerHTML = content;
        } else if (content instanceof Node) {
            this.sheetContent.innerHTML = '';
            this.sheetContent.appendChild(content);
        }
        this.setSheetHeight();
    }
}

// Attach BottomSheet to the global window object
window.BottomSheet = BottomSheet;
