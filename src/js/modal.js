// Definir referencias a los elementos del modal
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

// Agregar eventos de clic para abrir y cerrar el modal
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

// Función para alternar la visibilidad del modal
export function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}
