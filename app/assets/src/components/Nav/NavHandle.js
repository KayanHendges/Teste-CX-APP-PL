function switchTab(event){

    const className = event.path[0].className
    const position = className.substring(className.length-1, className.length)

    const tabSelector = document.getElementById("tab-selector")
    const optionsList = Array.from(tabSelector.children)

    optionsList.map((tab, index) => {
        if(position == index + 1){
            return tab.setAttribute("id", "tab-option-selected")
        } 
        return tab.setAttribute("id", "tab-option-disabled")
    })

    const mainContent = document.getElementById("main-content")
    const sections = Array.from(mainContent.children)

    sections.map((section, index) => {
        console.log(position, index)
        if(section.id == 'tab-selector'){
            return
        }
        if(position == index){
            return section.style.display = 'flex'
        }
        return section.style.display = 'none'
    })

}

const NavHandle = {
    switchTab
}

export default NavHandle