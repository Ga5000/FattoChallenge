
function Button({text, onClick}){ // onClick --> function
    return(
        <button onClick={onClick}>
            {text}
        </button>
    );
}

export default Button