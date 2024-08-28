import React, { useRef } from 'react';
import { Form} from '@formio/react';
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
            },
            
            
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
    },
    {
      type: "file",
      key: "fileUpload",
      label: "Upload File",
      input: true, 
      inputClass: "form-control", 
      storage: "base64", 
      url: "https://your-upload-url.com", 
      filePattern: "application/pdf", 
      fileMinSize: "0KB", 
      fileMaxSize: "10MB", 
      
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
            input: true
          },
          {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield',
            input: true
          },
          // {
          //   label: 'Gender',
          //   key: 'gender',
          //   type: 'select',
          //   input: true,
          //   data: {
          //     values: [
          //       {
          //         value: 'male',
          //         label: 'Male'
          //       },
          //       {
          //         value: 'female',
          //         label: 'Female'
          //       },
          //       {
          //         value: 'other',
          //         label: 'Other'
          //       }
          //     ]
          //   },
          //   dataSrc: 'values',
          //   template: '<span>{{ item.label }}</span>'
          // },
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
            "conditional": {
              "eq": "true",
              "when": "dependant",
              "show": "true"
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
    // const childrenComponent = formInstance.current?.getComponent('children');
    // if (childrenComponent) {
    //   childrenComponent.setValue([]);
    // }
    formInstance.current?.getComponent('firstName')?.setValue('');
    formInstance.current?.getComponent('lastName')?.setValue('');
    formInstance.current?.getComponent('email')?.setValue('');
    formInstance.current?.getComponent('phoneNumber')?.setValue('');
    formInstance.current?.getComponent('description')?.setValue('');
    
      
   
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
    formInstance.current.getComponent('description')?.setValue('bonjour john doe');
  };


  const onChange = (data: any) => {
      console.log('onChange ', data)
  }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center ">
      <div className="p-4 border rounded shadow-sm bg-light"  >
        <Form 
          form={formDefinition} 
          formReady={handleFormReady} 
          onSubmit={handleSubmit} 
          onChange={(changedData: any) => onChange(changedData)}
        />
        <button type="button" className="custom-button " onClick={handleClick}>Set Default Values</button>
      </div>
    </div>
  );
};

export default FormComponent;

