import ErrorSpan from "./components/CepForm/ErrorSpan.js";
import CommentHandler from "./components/CepResponse/CommentHandler.js";

const client = ZAFClient.init();

async function onChangeCep(event){

    event.preventDefault()

    const cepInput = document.getElementById("cep-input")
    const cepString = cepInput.value

    const cep = cepString.replace(/[^0-9]/g, '')

    cepInput.value = cep

    if(cep.length > 8){
        return cepInput.value = cep.substring(0, 5) + '-' + cep.substring(5, 8)
    }

    if(cep.length > 5){
        return cepInput.value = cep.substring(0, 5) + '-' + cep.substring(5, 8)
    }

    return

}

async function getCepData(event){
    event.preventDefault();

    CommentHandler.reset()
    ErrorSpan.reset()
    CommentHandler.setStatus('reset')

    const submitButton = document.getElementById("submit")
    submitButton.disabled = true

    const cepInput = document.getElementById("cep-input");
    const inputValue = cepInput.value;
    const cepValue = inputValue.replace(/[^0-9]/g, '')

    if(cepValue.length != 8){
        submitButton.disabled = false
        return ErrorSpan.setError('o cep precisa ter 8 números')
    }

    const cepData = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
    .then(response => { return response.json() })
    .catch(err => { return console.log(err) });

    submitButton.disabled = false

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
    
    const mainContent = document.getElementById("main-content");
    const mainContentHeight = mainContent.offsetHeight;

    const appHeight = mainContentHeight
    client.invoke("resize", { width: "100%", height: `${appHeight}px` });
}

async function submitTicket(event){

    CommentHandler.setStatus('loading')

    const { ticket } = await client.get('ticket')
    .catch(err => { return console.log(`Request error: ${error}`) });

    if(!ticket){
        CommentHandler.setStatus('error', 'não foi possível encontrar o ticket')
        return 
    }

    const { id: ticketId } = ticket;

    const comment = document.getElementById("comment-textarea").innerHTML
    const address = document.getElementById("address-container").innerHTML
    const privateComment = document.getElementById("private-checkbox").checked
    const isPublic = privateComment? false : true

    const ticketRequest = {
        ticket: {
            comment: {
                html_body: `${comment? `${comment}</br></br>` : ''}
                ${address}`,
                public: isPublic
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
        return true
    })
    .catch(err => { return console.log(err) })

    if(!hasUpdatedTicket){
        CommentHandler.setStatus('error', 'não foi possível encontrar o ticket')
        return
    }

    CommentHandler.setStatus('success')
}

const Core = {
    onChangeCep,
    getCepData,
    submitTicket,
};

export default Core;
