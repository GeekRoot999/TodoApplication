export function Buttons(props){
    return (
        <button type={props.type} 
            className={props.className} 
            disabled={props.disabled} 
            onClick={props.onClick}
        >
        {props.value}
        </button>
    )
}