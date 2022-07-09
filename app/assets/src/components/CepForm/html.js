const CepForm = `
<link rel="stylesheet" href="./src/components/CepForm/style.css" type="text/css" />
<form id="cep-form">
    <h2 id="cep-header">Informações do Cep</h2>
    <span id="cep-error"></span>
    <div id="input-container">
        <input type="text" id="cep-input" placeholder="insira o cep">
        <button id="submit" type="submit">buscar</button>
    </div>
</form>
`;

export default CepForm;
