// useForm.js
import { useState } from 'react';

const UseForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (section, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [fieldName]: value },
    }));
  };

  return {
    formData,
    handleInputChange,
  };
};

export default UseForm;
