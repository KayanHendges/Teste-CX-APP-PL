async function getCepData(event){
  event.preventDefault();

  const cepInput = document.getElementById("cep-input");
  const cepValue = cepInput.value;

  const cepAddress = document.getElementById("cep-address");
  const cepCity = document.getElementById("cep-city");
  const cepNumber = document.getElementById("cep-number");

  // implement validate cep

  const cepData = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
  .then(response => { return response.json() })
  .catch(err => { return console.log(err) });

  if(!cepData){
  // implement erro handler e controll error span
  };

  const { 
      logradouro, complemento,
      bairro, localidade, uf,
      cep 
  } = cepData;

  cepAddress.innerHTML = `${logradouro}${complemento? `, ${complemento}` : ''},`;
  cepCity.innerHTML = `${bairro} - ${localidade}/${uf}.`;
  cepNumber.innerHTML = `Cep: ${cep}`;

}

const Core = {
  getCepData
};

export default Core;
