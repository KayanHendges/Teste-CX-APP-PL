import CepForm from "./components/CepForm/html";
import CepResponse from "./components/CepResponse/html.js";
import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

client.on('app.registered', (e) => { // start eventListeners

  const form = document.getElementById("cep-form")
  const submitTicketButton = document.getElementById("submit-ticket")

  const privateCheckbox = document.getElementById("private-checkbox")
  const privateLabel = document.getElementById("private-label")

  form.addEventListener("submit", Core.getCepData );
  submitTicketButton.addEventListener("click", Core.submitTicket)
  privateLabel.addEventListener("click", (event) => {
      privateCheckbox.checked = !privateCheckbox.checked
  })

});

const Main = async () => {
  const App = document.getElementById("app");
  let appBody = `
  <div id="main-content">
    ${CepForm}
    ${CepResponse}
  </div>
  `;

  // Write App
  App.innerHTML = appBody;
};

export default Main;
