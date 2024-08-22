import React, { useRef } from 'react';
import { Form } from '@formio/react';
import 'bootstrap/dist/css/bootstrap.min.css';


interface FormComponent {
  type: string;
  key: string;
  label?: string;
  input?: boolean;
  inputClass?: string;
  placeholder?: string;
  validate?: { required?: boolean, pattern?: string, customMessage?: string };
  conditional?: { show?: boolean, when?: string, eq?: string };
  data?: { values?: { label: string, value: string }[] };
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
      placeholder: "Enter your first name",
      validate: {
        required: true,
        customMessage: "First Name is required",
      }
    },
    {
      type: "textfield",
      key: "lastName",
      label: "Last Name",
      input: true,
      inputClass: "form-control",
      placeholder: "Enter your last name",
      validate: {
        required: true,
        customMessage: "Last Name is required",
      }
    },
    {
      type: "email",
      key: "email",
      label: "Email",
      input: true,
      inputClass: "form-control",
      placeholder: "Enter your email",
      validate: {
        required: true,
        pattern: "^\\S+@\\S+$",
        customMessage: "Invalid email address",
      }
    },
  
    {
      type: "textfield",
      key: "province",
      label: "Province",
      input: true,
      inputClass: "form-control",
      placeholder: "Enter your province",
      conditional: {
        show: true,
        when: "country",
        eq: "ca",
      }
    },
    {
      type: "textarea",
      key: "comments",
      label: "Comments",
      input: true,
      inputClass: "form-control",
      placeholder: "Enter any additional comments",
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

// Définir un type pour l'instance du formulaire
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
    formInstance.current.getComponent('lastName')?.setValue('Doe');
    formInstance.current.getComponent('email')?.setValue('john.doe@example.com');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow-sm bg-light" style={{ width: '100%', maxWidth: '500px' }}>
        <Form form={formDefinition} formReady={handleFormReady} />
        <button type="button" className="btn btn-primary mt-3 w-100" onClick={handleClick}>Set Default Values</button>
      </div>
    </div>
  );
};

export default FormComponent;
