const inscripcionForm = document.getElementById('inscripcion-form');
const inscripcionResumen = document.getElementById('inscripcion-resumen');

const createResumen = (payload) => {
	const fecha = new Date(payload.fecha);
	const fechaLegible = Number.isNaN(fecha.getTime()) ? 'fecha por confirmar' : fecha.toLocaleDateString('es-AR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});

	return `✔️ ${payload.nombre} ${payload.apellido} quedó preinscripto/a al curso de ${payload.curso}.
📅 Revisión prevista: ${fechaLegible}.
📨 Confirmaremos en ${payload.correo}.`;
};

if (inscripcionForm && inscripcionResumen) {
	inscripcionForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const formData = new FormData(inscripcionForm);
		const payload = {
			nombre: formData.get('nombre')?.toString().trim() || 'Estudiante',
			apellido: formData.get('apellido')?.toString().trim() || '',
			correo: formData.get('correo')?.toString().trim() || '',
			telefono: formData.get('telefono')?.toString().trim() || '',
			fecha: formData.get('fecha')?.toString() || '',
			curso: formData.get('curso')?.toString() || 'Python',
			comentarios: formData.get('comentarios')?.toString().trim()
		};

		inscripcionResumen.textContent = createResumen(payload);
		inscripcionResumen.classList.remove('hidden');
		inscripcionForm.reset();
	});
}
