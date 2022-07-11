import CepForm from "./components/CepForm/html.js";
import CepResponse from "./components/CepResponse/html.js";
import Nav from "./components/Nav/html.js";
import NavHandle from "./components/Nav/NavHandler.js";
import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

client.on('app.registered', (e) => { // start eventListeners

  const tabOption1 = document.querySelector(".tab-option-1")
  const tabOption2 = document.querySelector(".tab-option-2")

  const form = document.getElementById("cep-form")
  const cepInput = document.getElementById("cep-input")
  const submitTicketButton = document.getElementById("submit-ticket")

  const privateCheckbox = document.getElementById("private-checkbox")
  const privateLabel = document.getElementById("private-label")

  tabOption1.addEventListener("click", NavHandle.switchTab)
  
  tabOption2.addEventListener("click", NavHandle.switchTab)
  tabOption2.addEventListener("click", Core.getLastTickets)

  form.addEventListener("submit", Core.getCepData );
  
  cepInput.addEventListener("input", Core.onChangeCep)

  submitTicketButton.addEventListener("click", Core.submitTicket)
  
  privateLabel.addEventListener("click", (event) => {
    privateCheckbox.checked = !privateCheckbox.checked
  })

});

const Main = async () => {
  const App = document.getElementById("app");
  App.innerHTML = ''
  
  let appBody = `
  <div id="main-content">
    ${Nav}
    <section id="get-cep">
      ${CepForm}
      ${CepResponse}
    </section>
    <section id="last-tickets">
    </section>
  </div>
  `;

  // Write App
  App.innerHTML = appBody;
};

export default Main;
