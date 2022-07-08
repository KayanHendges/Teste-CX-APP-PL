async function getCepData(event){
  event.preventDefault();

  var cepInput = document.getElementById("cep-input")
  var cep = cepInput.value

  // implement validate cep

  const cepData = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => { return response.json() })
  .catch(err => { return console.log(err) })

  if(!cepData){
  // implement erro handler e controll error span
  }

}

const Core = {
  getCepData
};

export default Core;
