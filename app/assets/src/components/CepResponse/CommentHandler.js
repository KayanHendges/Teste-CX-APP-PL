function setCep(address){

    const addressContainer = document.getElementById("address-container")
    addressContainer.innerHTML = address

    const commentContainer = document.getElementById("comment-container")
    commentContainer.style.display = 'flex'

    const commentTextArea = document.getElementById("comment-textarea")
    commentTextArea.focus()

}

const CommentHandler = {
    setCep
}

export default CommentHandler