import { ModalResult } from './../models/modal-result.model';
import { IModalComponent } from './../interfaces/modal-component.interface';
import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { IConfirmModal, IAlertModal, IInputModal } from '../interfaces';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { ConfirmModal, AlertModal, InputModalResponse, InputModal } from './../models';
import { InputModalComponent } from '../modals/input-modal/input-modal.component';
import { ModalSizeEnum } from '../enums/modal-size.enum';

@Injectable()
export class OltModalService {
  constructor(protected modalService: BsModalService) { }

  protected get defaultOptions(): Partial<ModalOptions> {
    const options = new ModalOptions();
    options.animated = true;
    options.backdrop = 'static';
    options.ignoreBackdropClick = true;
    options.keyboard = false;
    return options;
  }

  show(template: string | TemplateRef<any> | any, config?: Partial<ModalOptions>): BsModalRef {
    return this.modalService.show(template, config);
  }

  showFromComponent(component: any | Partial<IModalComponent>, initialState: any, size?: ModalSizeEnum | string): Observable<ModalResult> {
    let modalRef: BsModalRef;
    const config = this.defaultOptions;
    config.class = size || ModalSizeEnum.Large;
    config.initialState = initialState;
    return new Observable(observer => {
      modalRef = this.modalService.show(component, config);
      this.modalService.onHide.subscribe((event: any) => {
        observer.next(modalRef.content.modalResult);
        observer.complete();
      });

    });
  }

  /*
  * Confirm Modal
  *
  * @remarks   *
  * showConfirm(new ConfirmModal('Delete Confirmation', 'Delete Item?', ModalTypeEnum.Danger).subscribe(result => { console.log(result) })
  * showConfirm(new ConfirmModal('Approve Confirmation', 'Proceed with action?', ModalTypeEnum.Primary).subscribe(result => { console.log(result) })
  *
  *
  * @param settings: ConfirmModel object
  * @param config: ngx-boostrap ModalOptions
  * @returns Observable<boolean> - [true = Yes/Confirm] [false = No/Cancel]
  *
  */
  showConfirm(settings: Partial<IConfirmModal>, config?: Partial<ModalOptions>): Observable<boolean> {

    const copyConfig: ModalOptions = {
      ...this.defaultOptions,
      ...config,
    };

    let modalRef: BsModalRef;
    return new Observable(observer => {
      modalRef = this.modalService.show(ConfirmModalComponent, copyConfig);
      modalRef.content.settings = settings;
      this.modalService.onHide.subscribe((event: any) => {
        observer.next(modalRef.content.result === true);
        observer.complete();
      });
    });
  }

  /*
 * Alert Modal
 *
 * @remarks   *
 * showAlert(new AlertModel('Alert Notification', 'Missing Selection', ModalTypeEnum.Primary).subscribe(result => { console.log(result) })
 * showAlert(new AlertModel('Alert', 'An Error Occurred', ModalTypeEnum.Danger).subscribe(result => { console.log(result) })
 *
 *
 * @param settings: AlertModel object
 * @param config: ngx-boostrap ModalOptions
 * @returns Observable<void>
 *
 */
  showAlert(settings: Partial<IAlertModal>, config?: Partial<ModalOptions>): Observable<void> {


    const copyConfig: ModalOptions = {
      ...this.defaultOptions,
      ...config,
    };

    let modalRef: BsModalRef;
    return new Observable(observer => {
      modalRef = this.modalService.show(AlertModalComponent, copyConfig);
      modalRef.content.settings = settings;
      this.modalService.onHide.subscribe((event: any) => {
        observer.next();
        observer.complete();
      });
    });
  }

  /*
* Input Modal
* Will return an inputed value from modal using the ModalInputTypeEnum
*
*
* @remarks   *
* showInput(new InputModal('Note', 'New Note', ModalTypeEnum.Primary).subscribe(result => { console.log(result) })
* showInput(new InputModal('Please type ''Yes'' to confirm', 'Confirmation Required', ModalTypeEnum.Danger).subscribe(result => { console.log(result) })
*
*
* @param settings: IInputModal object
* @param config: ngx-boostrap ModalOptions
* @returns Observable<InputModalResponse>
*
*/
  showInput(settings: Partial<IInputModal>, config?: Partial<ModalOptions>): Observable<InputModalResponse> {


    const copyConfig: ModalOptions = {
      ...this.defaultOptions,
      ...config,
    };

    let modalRef: BsModalRef;
    return new Observable(observer => {
      modalRef = this.modalService.show(InputModalComponent, copyConfig);
      modalRef.content.settings = settings;
      this.modalService.onHide.subscribe((event: any) => {
        observer.next(modalRef.content.response as InputModalResponse);
        observer.complete();
      });
    });
  }


}
