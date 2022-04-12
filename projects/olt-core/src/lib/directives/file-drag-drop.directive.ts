import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';


@Directive({
    selector: '[oltFileDragDrop]'
})
export class FileDragDropDirective {
    @Output() filesDropped = new EventEmitter<FileList>();

    @HostBinding('style.background-color') 
    private background = '#fff';
    @HostBinding('style.opacity') 
    private opacity = '1';

    constructor() { }

    @HostListener('dragover', ['$event'])
    public onDragOver(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
        this.opacity = '0.8';
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff';
        this.opacity = '1';
    }

    @HostListener('drop', ['$event'])
    public onDrop(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#fff';
        this.opacity = '1';
        const files = evt.dataTransfer?.files;
        if (files !== undefined && files.length > 0) {
            this.filesDropped.emit(files);
        }


    }
}
