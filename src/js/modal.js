//modal.js

// Definir referencias a los elementos del modal
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'), // Botón para abrir el modal
  closeModalBtn: document.querySelector('[data-modal-close]'), // Botón para cerrar el modal
  modal: document.querySelector('[data-modal]'), // Elemento del modal
};

// Variable de control para verificar si el modal está abierto o cerrado
let isModalOpen = false;

// Función para abrir el modal
function openModal() {
  refs.modal.classList.remove('is-hidden');
  isModalOpen = true;
}

// Función para cerrar el modal
function closeModal() {
  refs.modal.classList.add('is-hidden');
  isModalOpen = false;
}

// Agregar eventos de clic para abrir y cerrar el modal
refs.openModalBtn.addEventListener('click', openModal); // Abrir el modal al hacer clic en el botón de apertura
refs.closeModalBtn.addEventListener('click', closeModal); // Cerrar el modal al hacer clic en el botón de cierre

// Agregar evento de teclado para cerrar el modal al presionar la tecla "Esc"
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Agregar evento de clic fuera del modal para cerrarlo
refs.modal.addEventListener('click', function (event) {
  if (event.target === refs.modal) {
    closeModal();
  }
});

// Función para alternar la visibilidad del modal
export function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}
