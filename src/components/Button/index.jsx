function Button({title, handleClick, type}) {
    return(
        <button 
            type={type} 
            onClick={event => handleClick(event)} 
            className="h-10 px-6 py-1 text-white text-base font-semibold bg-green-600 rounded-lg shadow-lg" >
                {title}
        </button>
    )
}

export default Button