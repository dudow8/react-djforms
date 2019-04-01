import { FormService, FormControlService } from './service';
import { Form } from './components';

const { addType } = FormControlService;

export {
    addType,
    FormService as FormBuilder,
    Form as DJForm
};
