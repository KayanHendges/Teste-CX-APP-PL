import ErrorSpan from "./components/CepForm/ErrorSpan";
import CommentHandler from "./components/CepResponse/CommentHandler";

const client = ZAFClient.init();

async function getCepData(event){
    event.preventDefault();
    ErrorSpan.reset()

    const cepInput = document.getElementById("cep-input");
    const cepValue = cepInput.value;

    // implement validate cep

    const cepData = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
    .then(response => { return response.json() })
    .catch(err => { return console.log(err) });

    if(!cepData){
        ErrorSpan.setError('erro ao buscar cep')
        return;
    };

    const { 
        logradouro, complemento,
        bairro, localidade, uf,
        cep 
    } = cepData;

    const address = `${logradouro}${complemento? `, ${complemento}` : ''},</br>`
    +`${bairro} - ${localidade}/${uf}.</br>`
    +`Cep: ${cep}.`

    CommentHandler.setCep(address)
    
    const mainContainer = document.getElementById("main-container");
    const mainContainerHeight = mainContainer.offsetHeight;

    const commentContainer = document.getElementById("comment-container")
    const commentContainerHeight = commentContainer.offsetHeight

    const appHeight = mainContainerHeight + commentContainerHeight 
    client.invoke("resize", { width: "100%", height: `${appHeight}px` });

}

async function submitTicket(event){

  const { ticket } = await client.get('ticket')
  .catch(err => { return console.log(`Request error: ${error}`) });

  if(!ticket){
      // implement span error handler
      return 
  }

  const { id: ticketId } = ticket;

  const cepAddress = document.getElementById("cep-address").innerHTML;
  const cepCity = document.getElementById("cep-city").innerHTML;
  const cepNumber = document.getElementById("cep-number").innerHTML;

  const ticketRequest = {
      ticket: {
          comment: {
              html_body: `<p>${cepAddress}</p>
              <p>${cepCity}</p>
              <p>${cepNumber}</p>`
          }
      }
  }

  const hasUpdatedTicket = client.request({
      method: 'put',
      url: `/api/v2/tickets/${ticketId}`,
      contentType: 'application/json',
      data: JSON.stringify(ticketRequest)
  })
  .then(response => {
      console.log(response)
      return true
  })
  .catch(err => { return console.log(err) })

  if(!hasUpdatedTicket){
      // implement span error handler
      return
  }

  console.log("ticket updated")

}

const Core = {
  getCepData,
  submitTicket,
};

export default Core;
