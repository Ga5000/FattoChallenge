
function Button({text, image, onClick}){ // onClick --> function
    return(
        <button onClick={onClick}>
            {text == "" ? <img src={image} ></img> : text}
        </button>
    );
}

export default Button