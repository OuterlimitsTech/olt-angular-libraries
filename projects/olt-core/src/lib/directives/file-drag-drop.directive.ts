import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
} from '@angular/core';


@Directive({
    selector: '[oltFileDragDrop]',
    standalone: false
})
export class FileDragDropDirective {
    @Output() filesDropped = new EventEmitter<FileList>();

    @HostBinding('class')
    private class = 'file-drop-area';

    constructor() { }

    @HostListener('dragover', ['$event'])
    public onDragOver(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.class = 'olt-file-drop-area olt-file-drop-area-dragover';
        if (this.class == '') { } //To prevent tsconfig compile error for unused variable        
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.class = 'file-drop-area';
    }

    @HostListener('drop', ['$event'])
    public onDrop(evt: DragEvent): void {
        evt.preventDefault();
        evt.stopPropagation();
        this.class = 'file-drop-area';
        const files = evt.dataTransfer?.files;
        if (files !== undefined && files.length > 0) {
            this.filesDropped.emit(files);
        }
    }
}
