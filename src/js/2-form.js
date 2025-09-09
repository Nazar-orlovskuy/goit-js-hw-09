const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// початковий об’єкт
let formData = {
  email: "",
  message: "",
};

// ▸ функція для збереження даних у localStorage
function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ▸ завантаження даних з localStorage
function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}

// ▸ відновлюємо дані у формі при завантаженні сторінки
const savedData = loadFromStorage();
if (savedData) {
  formData = savedData;
  form.elements.email.value = savedData.email || "";
  form.elements.message.value = savedData.message || "";
}

// ▸ слухаємо input на всій формі (делегування)
form.addEventListener("input", (e) => {
  const { name, value } = e.target;
  formData[name] = value.trim();
  saveToStorage(formData);
});

// ▸ обробка submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted data:", formData);

  // очищаємо все
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});
