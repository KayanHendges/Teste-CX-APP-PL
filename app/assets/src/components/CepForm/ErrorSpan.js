function setError(error){
    const errorSpan = document.getElementById("cep-error")

    errorSpan.style.display = 'block'
    errorSpan.innerHTML = error
}

function reset(){
    const errorSpan = document.getElementById("cep-error")

    errorSpan.innerHTML = ''
    errorSpan.style.display = 'none'
}

const ErrorSpan = {
    setError,
    reset
}

export default ErrorSpan