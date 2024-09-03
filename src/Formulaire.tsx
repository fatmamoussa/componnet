import React, { useRef, useState } from 'react';
import { Form } from '@formio/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


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
              key: "phoneNumber",
              label: "Phone Number",
              input: true,
              placeholder: "Enter your phone number",
              inputClass: "form-control",
              validate: {
                pattern: "^[0-9]{8}$",
                customMessage: "Please enter a valid phone number containing only digits."
              },
              inputType: 'text'
            }
          ]
        }
      ]
    },
    {
      type: "textarea",
      key: "description",
      label: "Description",
      input: true,
      placeholder: "Enter your description",
      inputClass: "form-control",
      rows: 3,
      validate: {
        required: {
          message: "Description is required"
        },
      }
    },
    {
      type: "survey",
      key: "survey",
      label: "Survey",
      input: true,
      questions: [
        { value: "howWouldYouRateTheFormIoPlatform", label: "How would you rate the Form.io platform?" },
        { value: "howWasCustomerSupport", label: "How was Customer Support?" },
      ],
      values: [
        { value: "excellent", label: "Excellent" },
        { value: "great", label: "Great" },
        { value: "good", label: "Good" },
        { value: "average", label: "Average" },
      ]
    },
    {
      label: 'Children',
      key: 'children',
      type: 'datagrid',
      input: true,
      validate: {
        minLength: 1,
        maxLength: 6
      },
      components: [
        {
          label: 'First Name',
          key: 'firstName',
          type: 'textfield',
          input: true,
          inputClass: "form-control",
          validate: {
            value: "^[A-Za-z]+$", 
            message: "Please enter a valid first name with alphabetic characters only."
          }
        },
        {
          label: 'Last Name',
          key: 'lastName',
          type: 'textfield',
          input: true,
          inputClass: "form-control",
          validate: {
            value: "^[A-Za-z]+$", 
            message: "Please enter a valid last name with alphabetic characters only."
          }
        },
        {
          type: 'checkbox',
          label: 'Dependant',
          key: 'dependant',
          inputType: 'checkbox',
          input: true
        },
        {
          label: 'Birthdate',
          key: 'birthdate',
          type: 'datetime',
          input: true,
          format: 'yyyy-MM-dd hh:mm a',
          enableDate: true,
          enableTime: true,
          defaultDate: '',
          datepickerMode: 'day',
          datePicker: {
            showWeeks: true,
            startingDay: 0,
            initDate: '',
            minMode: 'day',
            maxMode: 'year',
            yearRows: 4,
            yearColumns: 5,
            datepickerMode: 'day'
          },
          timePicker: {
            hourStep: 1,
            minuteStep: 1,
            showMeridian: true,
            readonlyInput: false,
            mousewheel: true,
            arrowkeys: true
          },
          conditional: {
            eq: 'true',
            when: 'dependant',
            show: 'true'
          }
        }
      ]
    },
    {
      type: "button",
      key: "submit",
      label: "Submit",
      input: true,
      inputClass: "custom-button ",
      customClass: "custom-inline-styles",
    },
  ]
};

interface FormioInstance {
  getComponent: (key: string) => { setValue: (value: any) => void } | undefined;
}

const FormComponent: React.FC = () => {
  const formInstance = useRef<FormioInstance | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleFormReady = (instance: FormioInstance) => {
    formInstance.current = instance;
  };

  const validateDescriptionLength = (description: string): boolean => {
    return description.length <= 20;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // You can handle the selected file here if needed
    }
  };

  const validateAge = (birthDate: Date): boolean => {
    const minAge = 16;
    const maxAge = 70;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= minAge && age <= maxAge;
  };

  const handleSubmit = (submission: any) => {
    console.log('Form submitted with data:', submission.data);

   
    const children = submission.data.children || [];
    for (const child of children) {
      if (child.birthdate) {
        const birthDate = new Date(child.birthdate);
        if (!validateAge(birthDate)) {
          alert('All children must be between 16 and 70 years old.');
          return; 
        }
      }
      navigate('/Formul'); 
    }

   
    const description = submission.data.description || '';
    if (!validateDescriptionLength(description)) {
      alert('Description must be no more than 20 characters long.');
      return; 
    }

    
    const childrenComponent = formInstance.current?.getComponent('children');
    if (childrenComponent) {
      (childrenComponent as any).setValue([]);
    }
    const surveyComponent = formInstance.current?.getComponent('survey');
    if (surveyComponent) {
      (surveyComponent as any).setValue({
        howWouldYouRateTheFormIoPlatform: '', 
        howWasCustomerSupport: '' 
      });
    }
    formInstance.current?.getComponent('firstName')?.setValue('');
    formInstance.current?.getComponent('lastName')?.setValue('');
    formInstance.current?.getComponent('email')?.setValue('');
    formInstance.current?.getComponent('phoneNumber')?.setValue('');
    formInstance.current?.getComponent('description')?.setValue('');

    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    
    setSuccessMessage('Form successfully submitted!');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000); // Message disparaît après 1 secondes
  };

  const handleClick = () => {
    if (!formInstance.current) {
      console.log("Our form isn't quite ready yet.");
      return;
    }

    formInstance.current.getComponent('email')?.setValue('john.doe@example.com');
    formInstance.current.getComponent('phoneNumber')?.setValue('97000000');
    formInstance.current.getComponent('description')?.setValue('bonjour john doe');

    
    const surveyComponent = formInstance.current.getComponent('survey');
    if (surveyComponent) {
      (surveyComponent as any).setValue({
        howWouldYouRateTheFormIoPlatform: 'excellent', 
        howWasCustomerSupport: 'good' 
      });
    }

    
    const childrenComponent = formInstance.current.getComponent('children');
    if (childrenComponent) {
      (childrenComponent as any).setValue([
        {
          firstName: 'Jane',
          lastName: 'Doe',
          dependant: true,
          birthdate: '2000-01-01T00:00:00Z'
        }
      ]);
    }
  };

  const onChange = (data: any) => {
    console.log('onChange ', data);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="p-4 border rounded shadow-sm bg-light">
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef} // Attach the ref to the file input
        />
        <Form 
          form={formDefinition} 
          formReady={handleFormReady} 
          onSubmit={handleSubmit} 
          onChange={(changedData: any) => onChange(changedData)}
        />
        <button type="button" className="custom-button" onClick={handleClick}>Set Default Values</button>
        {successMessage && (
          <div className="alert alert-success mt-3">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
