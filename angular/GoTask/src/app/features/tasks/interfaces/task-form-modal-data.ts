import { ITaskFormControls } from './taks-form-controls';

export interface ITaskFormModalData {
  mode: 'create' | 'edit';
  formValues: ITaskFormControls;
}
