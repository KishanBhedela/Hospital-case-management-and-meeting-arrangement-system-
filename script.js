// Data storage
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let meetings = JSON.parse(localStorage.getItem("meetings")) || [];
let emergencies = JSON.parse(localStorage.getItem("emergencies")) || [];

// Show section
function showSection(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  updateStats();
}

// Add Patient
function addPatient(e) {
  e.preventDefault();
  let name = document.getElementById("patientName").value;
  let age = document.getElementById("patientAge").value;
  let disease = document.getElementById("patientDisease").value;
  patients.push({ name, age, disease });
  localStorage.setItem("patients", JSON.stringify(patients));
  document.getElementById("patientName").value = "";
  document.getElementById("patientAge").value = "";
  document.getElementById("patientDisease").value = "";
  renderPatients();
  updateStats();
}

// Add Doctor
function addDoctor(e) {
  e.preventDefault();
  let name = document.getElementById("doctorName").value;
  let specialty = document.getElementById("doctorSpecialty").value;
  doctors.push({ name, specialty });
  localStorage.setItem("doctors", JSON.stringify(doctors));
  document.getElementById("doctorName").value = "";
  document.getElementById("doctorSpecialty").value = "";
  renderDoctors();
  updateStats();
}

// Add Appointment
function addAppointment(e) {
  e.preventDefault();
  let patient = document.getElementById("appointmentPatient").value;
  let doctor = document.getElementById("appointmentDoctor").value;
  let date = document.getElementById("appointmentDate").value;
  appointments.push({ patient, doctor, date });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  renderAppointments();
  updateStats();
}

// Add Meeting
function addMeeting(e) {
  e.preventDefault();
  let title = document.getElementById("meetingTitle").value;
  let date = document.getElementById("meetingDate").value;
  meetings.push({ title, date });
  localStorage.setItem("meetings", JSON.stringify(meetings));
  renderMeetings();
  updateStats();
}

// Emergency
function triggerEmergency() {
  let now = new Date().toLocaleString();
  emergencies.push({ case: "Emergency Alert!", time: now });
  localStorage.setItem("emergencies", JSON.stringify(emergencies));
  renderEmergencies();
}

// Render functions
function renderPatients() {
  let list = document.getElementById("patientList");
  list.innerHTML = patients.map(p => `<li>${p.name}, ${p.age} yrs - ${p.disease}</li>`).join("");
  updateAppointmentOptions();
}
function renderDoctors() {
  let list = document.getElementById("doctorList");
  list.innerHTML = doctors.map(d => `<li>${d.name} (${d.specialty})</li>`).join("");
  updateAppointmentOptions();
}
function renderAppointments() {
  let list = document.getElementById("appointmentList");
  list.innerHTML = appointments.map(a => `<li>${a.patient} with Dr. ${a.doctor} on ${a.date}</li>`).join("");
}
function renderMeetings() {
  let list = document.getElementById("meetingList");
  list.innerHTML = meetings.map(m => `<li>${m.title} on ${m.date}</li>`).join("");
}
function renderEmergencies() {
  let list = document.getElementById("emergencyList");
  list.innerHTML = emergencies.map(e => `<li>${e.case} at ${e.time}</li>`).join("");
}

// Update appointment dropdowns
function updateAppointmentOptions() {
  let patientSelect = document.getElementById("appointmentPatient");
  let doctorSelect = document.getElementById("appointmentDoctor");
  patientSelect.innerHTML = patients.map(p => `<option>${p.name}</option>`).join("");
  doctorSelect.innerHTML = doctors.map(d => `<option>${d.name}</option>`).join("");
}

// Update stats
function updateStats() {
  document.getElementById("statPatients").innerText = patients.length;
  document.getElementById("statDoctors").innerText = doctors.length;
  document.getElementById("statAppointments").innerText = appointments.length;
  document.getElementById("statMeetings").innerText = meetings.length;
}

// Initial render
renderPatients();
renderDoctors();
renderAppointments();
renderMeetings();
renderEmergencies();
updateStats();
