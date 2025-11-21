const examenForm = document.getElementById('examen-form');
const scorePanel = document.getElementById('score-panel');

const respuestasCorrectas = {
	q1: 'python',
	q2: 'verdadero',
	q3: ['lenguaje de marcado', 'html', 'hypertext markup language'],
	q4: 'central',
	q5: 'si'
};

const normalizarTexto = (texto) => texto.toString().trim().toLowerCase();

const evaluarTexto = (respuesta) => {
	const value = normalizarTexto(respuesta);
	return respuestasCorrectas.q3.some((item) => value.includes(item));
};

const actualizarEstadoPregunta = (elemento, esCorrecta) => {
	if (!elemento) return;
	elemento.classList.remove('is-correct', 'is-wrong');
	elemento.classList.add(esCorrecta ? 'is-correct' : 'is-wrong');
};

if (examenForm && scorePanel) {
	examenForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const formData = new FormData(examenForm);

		let puntaje = 0;
		examenForm.querySelectorAll('.question-list li').forEach((item) => item.classList.remove('is-correct', 'is-wrong'));

		const respuestasUsuario = {
			q1: formData.get('q1'),
			q2: formData.get('q2'),
			q3: formData.get('q3'),
			q4: formData.get('q4'),
			q5: formData.get('q5')
		};

		Object.entries(respuestasUsuario).forEach(([pregunta, respuesta], index) => {
			const contenedor = examenForm.querySelectorAll('.question-list li')[index];
			if (!respuesta) {
				actualizarEstadoPregunta(contenedor, false);
				return;
			}

			let esCorrecta = false;
			if (pregunta === 'q3') {
				esCorrecta = evaluarTexto(respuesta);
			} else {
				esCorrecta = normalizarTexto(respuesta) === respuestasCorrectas[pregunta];
			}

			if (esCorrecta) {
				puntaje += 1;
			}
			actualizarEstadoPregunta(contenedor, esCorrecta);
		});

		scorePanel.innerHTML = `
			<strong>Resultado: ${puntaje}/5</strong>
			<p>${puntaje >= 4 ? '¡Excelente! Estás listo/a para avanzar.' : 'Repasa los temas marcados en rojo y vuelve a intentarlo.'}</p>
		`;
	});
}
