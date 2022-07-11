const CepResponse = `
<div id="comment-container">
    <img id="comment-loader" src="../assets/images/loading.gif" alt="loading">
    <h3 id="comment-header">Digite o comentário</h3>
    <div id="comment">
        <div id="comment-textarea" contenteditable></div>
        <div id="address-container"></div>
    </div>
    <div id="buttons-container">
        <input type="checkbox" id="private-checkbox" value="true">
        <span id="private-label">Privado</span>
        <button id="submit-ticket">enviar ticket</button>
    </div>
    <div id="status-container">
        <span id="status-submit">enviando</span>
        <span id="status-loader"></span>
    </div>
</div>
`;

export default CepResponse;