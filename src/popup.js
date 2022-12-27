import { format } from 'date-fns';

export default class Popup {
    constructor(parent, custom_html) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.make();
        this.hide();

    }

    make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    show(options) {
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }
        if (!options.position) {
            options.position = 'left';
        }
        // const target_element = options.target_element;

        if (this.custom_html) {
            let html = this.custom_html(options.task);
            html += '<div class="pointer"></div>';
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.pointer');
        } else {
            // set data
            this.title.innerHTML = options.title;
            const taskStart = format(new Date(options.task.start), 'yyyy-MM-dd HH:mm')
            const taskEnd = format(new Date(options.task.end), 'yyyy-MM-dd HH:mm')
            this.subtitle.innerHTML = `${taskStart} - ${taskEnd}`;
            this.parent.style.width = this.parent.clientWidth + 'px';
        }

        if (options.position === 'left') {
            this.parent.style.left = options.event.offsetX + 'px';
            const _top = parseInt(options.event.offsetY) + 10;
            this.parent.style.top = _top + 'px';

            this.pointer.style.transform = 'rotateZ(180deg)';
            this.pointer.style.left = '158px';
            this.pointer.style.top = '-11px';
        }

        // show
        this.parent.style.display = '';
    }

    hide() {
        this.parent.style.display = 'none';
    }
}
