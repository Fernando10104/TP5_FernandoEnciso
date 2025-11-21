const STORAGE_KEY = 'tp5-bienvenida';

const welcomeForm = document.getElementById('welcome-form');
const welcomeMessage = document.getElementById('welcome-message');
const welcomeName = document.getElementById('welcome-name');
const nameChip = document.querySelector('[data-chip="nombre"]');

const formatName = (nombre, apellido) => {
	const trimmed = `${nombre} ${apellido}`.trim();
	return trimmed.replace(/\s+/g, ' ');
};

const showWelcome = (nombreCompleto) => {
	if (!welcomeMessage || !welcomeName) return;
	welcomeName.textContent = nombreCompleto;
	welcomeMessage.classList.remove('hidden');
	if (nameChip) {
		nameChip.textContent = nombreCompleto;
	}
};

const persistName = (payload) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	} catch (error) {
		console.warn('No se pudo guardar el nombre en el almacenamiento local.', error);
	}
};

const loadName = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return null;
		return JSON.parse(stored);
	} catch (error) {
		console.warn('No se pudo leer el nombre del almacenamiento local.', error);
		return null;
	}
};

if (welcomeForm) {
	welcomeForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const formData = new FormData(welcomeForm);
		const nombre = (formData.get('nombre') || '').toString().trim();
		const apellido = (formData.get('apellido') || '').toString().trim();
		const cic = (formData.get('cic') || '').toString().trim();

		if (!nombre || !apellido) {
			welcomeMessage?.classList.add('hidden');
			return;
		}

		const nombreCompleto = formatName(nombre, apellido);
		showWelcome(nombreCompleto);
		persistName({ nombreCompleto, cic });
		welcomeForm.reset();
	});

	const saved = loadName();
	if (saved?.nombreCompleto) {
		showWelcome(saved.nombreCompleto);
	}
}
