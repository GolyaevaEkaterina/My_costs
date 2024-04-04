function Button({title, handleClick, type, arr}) {
    return(
        <button 
            type={type} 
            onClick={event => handleClick(event, arr)} 
            className="h-10 px-6 py-1 text-white text-base font-semibold bg-violet-950 rounded-lg shadow-lg" >
                {title}
        </button>
    )
}

export default Button