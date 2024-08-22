import React, { useRef } from 'react';
import { Form } from '@formio/react';
import 'bootstrap/dist/css/bootstrap.min.css';

const formDefinition = {
  type: "form",
  display: "form",
  components: [
    {
      type: "columns",
      columns: [
        {
          components: [
            {
              type: "textfield",
              key: "firstName",
              label: "First Name",
              input: true,
              placeholder: "Enter your first name",
              inputClass: "form-control",
            },
            {
              type: "email",
              key: "email",
              label: "Email",
              input: true,
              placeholder: "Enter your email address",
              inputClass: "form-control",
            }
          ]
        },
        {
          components: [
            {
              type: "textfield",
              key: "lastName",
              label: "Last Name",
              input: true,
              placeholder: "Enter your last name",
              inputClass: "form-control",
            },
            {
              type: "textfield",
              key: "phoneNumber",
              label: "Phone Number",
              input: true,
              placeholder: "Enter your phone number",
              inputClass: "form-control",
            }
          ]
        }
      ]
    },
    {
      type: "survey",
      key: "survey",
      label: "Survey",
      input: true,
      questions: [
        { value: "howWouldYouRateTheFormIoPlatform", label: "How would you rate the Form.io platform?" },
        { value: "howWasCustomerSupport", label: "How was Customer Support?" },
        { value: "overallExperience", label: "Overall Experience?" }
      ],
      values: [
        { value: "excellent", label: "Excellent" },
        { value: "great", label: "Great" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
        { value: "poor", label: "Poor" }
      ]
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

  // Ajoutez une fonction pour gérer la soumission du formulaire dans l inspection 
  const handleSubmit = (submission: any) => {
    console.log('Form submitted with data:', submission.data);
  };

  const handleClick = () => {
    if (!formInstance.current) {
      console.log("Our form isn't quite ready yet.");
      return;
    }
    formInstance.current.getComponent('firstName')?.setValue('John');
    formInstance.current.getComponent('lastName')?.setValue('Doe');
    formInstance.current.getComponent('email')?.setValue('john.doe@example.com');
    formInstance.current.getComponent('phoneNumber')?.setValue('97000000');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow-sm bg-light" style={{ width: '100%', maxWidth: '500px' }}>
        <Form 
          form={formDefinition} 
          formReady={handleFormReady} 
          onSubmit={handleSubmit} // Ajoutez l'événement onSubmit ici
        />
        <button type="button" className="btn btn-primary mt-3 w-100" onClick={handleClick}>Set Default Values</button>
      </div>
    </div>
  );
};

export default FormComponent;
