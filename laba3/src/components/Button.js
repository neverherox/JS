function Button(props) {
    return (
    <button style = {props.style} onClick = {props.onClick}>
        {props.value}
    </button>
    );
}

export default Button;