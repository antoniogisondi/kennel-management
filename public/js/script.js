export function addTherapyEdit() {
    const container = document.getElementById('therapyContainer');
    let index = parseInt(container.getAttribute('data-therapy-index'), 10) || 0;
    const newTherapy = document.createElement('div');
    newTherapy.classList.add('therapy');

    newTherapy.innerHTML = `
    <label for="therapyName${index}">Nome della Terapia:</label>
    <input type="text" id="therapyName${index}" name="therapy[${index}].name">

    <label for="therapyDosage${index}">Dosaggio:</label>
    <input type="text" id="therapyDosage${index}" name="therapy[${index}].dosage">

    <label for="therapyStartDate${index}">Data Inizio:</label>
    <input type="date" id="therapyStartDate${index}" name="therapy[${index}].startDate">

    <label for="therapyEndDate${index}">Data Fine:</label>
    <input type="date" id="therapyEndDate${index}" name="therapy[${index}].endDate">
`;

    container.appendChild(newTherapy);
    index++
}

export function addTherapy() {
    let therapyIndex = 1;
    const container = document.getElementById('therapyContainer');
    const newTherapy = document.createElement('div');
    newTherapy.classList.add('therapy');

    newTherapy.innerHTML = `
        <div class="form-group">
            <label for="therapyName${therapyIndex}">Nome della Terapia:</label>
            <input type="text" id="therapyName${therapyIndex}" name="therapy[${therapyIndex}].name" class="form-control">
        </div>

        <div class="form-group">
            <label for="therapyDosage${therapyIndex}">Dosaggio:</label>
            <input type="text" id="therapyDosage${therapyIndex}" name="therapy[${therapyIndex}].dosage" class="form-control">
        </div>

        <div class="form-group">
            <label for="therapyStartDate${therapyIndex}">Data Inizio:</label>
            <input type="date" id="therapyStartDate${therapyIndex}" name="therapy[${therapyIndex}].startDate" class="form-control">
        </div>

        <div class="form-group">
            <label for="therapyEndDate${therapyIndex}">Data Fine:</label>
            <input type="date" id="therapyEndDate${therapyIndex}" name="therapy[${therapyIndex}].endDate" class="form-control">
        </div>
    `;

    container.appendChild(newTherapy);
    therapyIndex++;
}

// Funzioni per abilitare/disabilitare i campi di adozione e sterilizzazione
export function toggleAdoptionDate() {
    const adoptedCheckbox = document.getElementById('adopted');
    const adoptionDateInput = document.getElementById('adoptionDate');

    if (adoptedCheckbox.checked) {
        adoptionDateInput.disabled = false;
    } else {
        adoptionDateInput.disabled = true;
        adoptionDateInput.value = ''; // Resetta il valore della data se disabilitato
    }
}

export function toggleSterilizationDate() {
    const isSterilizedCheckbox = document.getElementById('isSterilized');
    const sterilizationDateInput = document.getElementById('sterilizationDate');

    if (isSterilizedCheckbox.checked) {
        sterilizationDateInput.disabled = false;
    } else {
        sterilizationDateInput.disabled = true;
        sterilizationDateInput.value = ''; // Resetta il valore della data se disabilitato
    }
}

// Assicura che le funzioni vengano eseguite all'avvio per impostare lo stato corretto
document.addEventListener('DOMContentLoaded', function () {
    toggleAdoptionDate();
    toggleSterilizationDate();
});

window.addTherapy = addTherapy
window.addTherapyEdit = addTherapyEdit