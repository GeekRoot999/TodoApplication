export function LabelInput({type, value, className, placeholder, onChange, labelfor, labelvalue, id}){
    return (
        <label htmlFor={labelfor}>{labelvalue}
            <input type={type} id={id} placeholder={placeholder} className={className} value={value} onChange={onChange} />
        </label>
    )
}

export function Input(props){
    return (
        <input type={props.type} 
            id={props.id} 
            placeholder={props.placeholder} 
            className={props.className} 
            value={props.value} 
            onChange={props.onChange} />
    )
}