import CepForm from "./components/CepForm.js";
import CepResponse from "./components/CepResponse.js";
import Core from "./Core.js";

const client = ZAFClient.init();
let settings;

client.metadata().then((metadata) => {
  settings = metadata.settings;
});

client.on('app.registered', (e) => {

  const cepForm = document.getElementById("cep-form")
  const submitTicketButton = document.getElementById("submit-ticket")

  cepForm.addEventListener("submit", Core.getCepData);
  submitTicketButton.addEventListener("click", Core.submitTicket)

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
