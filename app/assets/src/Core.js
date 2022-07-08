const client = ZAFClient.init();

async function getCepData(event){
  event.preventDefault();

  const cepInput = document.getElementById("cep-input");
  const cepValue = cepInput.value;

  const commentTextArea = document.getElementById("comment")
  const submitTicketButton = document.getElementById("submit-ticket")

  // implement validate cep

  const cepData = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
  .then(response => { return response.json() })
  .catch(err => { return console.log(err) });

  if(!cepData){
      // implement erro handler e controll error span
      return;
  };

  const { 
      logradouro, complemento,
      bairro, localidade, uf,
      cep 
  } = cepData;

  const cepText = `\n\n` 
  +`${logradouro}${complemento? `, ${complemento}` : ''},\n`
  +`${bairro} - ${localidade}/${uf}.\n`
  +`Cep: ${cep}.`

  commentTextArea.innerHTML = cepText
  commentTextArea.style.display = 'flex'
  commentTextArea.focus()

  submitTicketButton.style.display = 'flex'
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
