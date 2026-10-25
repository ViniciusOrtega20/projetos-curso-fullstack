import { Routes } from '@angular/router';
import { TwoWayDataBinding } from './components/two-way-data-binding/two-way-data-binding';
import { TemplateReferenceVariable } from './components/template-reference-variable/template-reference-variable';
import { OneWayBindingForm } from './components/one-way-binding-form/one-way-binding-form';
import { TwoWayBindingForm } from './components/two-way-binding-form/two-way-binding-form';

export const playgroundRoutes: Routes = [
  {
    path: 'two-way',
    component: TwoWayDataBinding,
  },
  {
    path: 'ref-variable',
    component: TemplateReferenceVariable,
  },
  {
    path: 'one-way-form',
    component: OneWayBindingForm,
  },
  {
    path: 'two-way-form',
    component: TwoWayBindingForm,
  },
];
