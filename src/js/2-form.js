const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});
  
const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (form.elements.email) {
      form.elements.email.value = formData.email || '';
    }
    if (form.elements.message) {
      form.elements.message.value = formData.message || '';
    }
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  formData = { email: '', message: '' };
  localStorage.removeItem('feedback-form-state');
  form.reset();
});