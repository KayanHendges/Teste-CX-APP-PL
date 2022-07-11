function reset(){
    const commentTextArea = document.getElementById("comment-textarea")
    const addressContainer = document.getElementById("address-container")
    const privateCheckbox = document.getElementById("private-checkbox")

    commentTextArea.innerHTML = ''
    addressContainer.innerHTML= ''
    privateCheckbox.checked = false
}

function setCep(address){

    const addressContainer = document.getElementById("address-container")
    addressContainer.innerHTML = address

    const commentContainer = document.getElementById("comment-container")
    commentContainer.style.display = 'flex'

    const commentTextArea = document.getElementById("comment-textarea")
    commentTextArea.focus()

}

function setStatus(status, message){
    
    const statusContainer = document.getElementById("status-container")
    const statusSubmit = document.getElementById("status-submit")
    const statusLoader = document.getElementById("status-loader")

    const buttonsContainer = document.getElementById("buttons-container")

    if(status == 'reset'){
        statusContainer.style.display = 'none'
        statusSubmit.style.color = '#1f73b7'
        statusSubmit.innerHTML = ''
        statusLoader.style.display = 'none'

        buttonsContainer.style.display = 'flex'
        return
    }

    buttonsContainer.style.display = 'none'
    statusContainer.style.display = 'flex'

    if(status == 'loading'){
        const loadingMessage = message? message : 'enviando'

        statusSubmit.style.color = '#1f73b7'
        statusSubmit.innerHTML = loadingMessage
        statusLoader.style.display = 'flex'
        return
    }

    statusLoader.style.display = 'none'

    if(status == 'success'){
        const successMessage = message? message : 'enviado com sucesso.'

        statusSubmit.style.color = '#1c9610'
        statusSubmit.innerHTML = successMessage
        return
    }

    if(status == 'error'){
        const errorMessage = message? message : 'erro ao enviar.'

        statusSubmit.style.color = '#e20316'
        statusSubmit.innerHTML = errorMessage
        return
    }

}

const CommentHandler = {
    reset,
    setCep,
    setStatus
}

export default CommentHandler