import React, { useRef } from 'react';
import { Form } from '@formio/react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormComponent {
  type: string;
  key: string;
  label?: string;
  input?: boolean;
  inputClass?: string;
}

const formDefinition: { type: string; display: string; components: FormComponent[] } = {
  type: "form",
  display: "form",
  components: [
    {
      type: "textfield",
      key: "firstName",
      label: "First Name",
      input: true,
      inputClass: "form-control",
    },
    {
      type: "textfield",
      key: "lastName",
      label: "Last Name",
      input: true,
      inputClass: "form-control",
    },
    {
      type: "button",
      key: "submit",
      label: "Submit",
      input: true,
      inputClass: "btn btn-primary",
    }
  ]
};


interface FormioInstance {
  getComponent: (key: string) => { setValue: (value: string) => void } | undefined;
}

const FormComponent: React.FC = () => {
  const formInstance = useRef<FormioInstance | null>(null);

  const handleFormReady = (instance: FormioInstance) => {
    formInstance.current = instance;
  };

  const handleClick = () => {
    if (!formInstance.current) {
      console.log("Our form isn't quite ready yet.");
      return;
    }
    formInstance.current.getComponent('firstName')?.setValue('John');
    formInstance.current.getComponent('lastName')?.setValue('Smith');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow-sm bg-light" style={{ width: '100%', maxWidth: '400px' }}>
        <Form form={formDefinition} formReady={handleFormReady} />
        <button type="button" className="btn btn-primary mt-3 w-100" onClick={handleClick}>Set Names</button>
      </div>
    </div>
  );
};

export default FormComponent;
