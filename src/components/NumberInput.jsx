import classes from '../scss/NumberInput.module.css'

const NumberInput = (props) => {
    return <>

        <div className={`${classes['form-group']} ${props.errors.day ? classes['error'] : ''}`}>
            <label htmlFor={props.label}>{props.label}</label>

            <input type="number"
                    className={classes.fields}
                    {...props.register(props.label, props.validation)}
                    placeholder={props.placeholder}
            />

            <p>{props.errors[props.label]?.message}</p>
        </div>

    </>
}

export default NumberInput;