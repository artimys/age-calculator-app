import classes from '../scss/NumberInput.module.css'

const NumberInput = (props) => {
    return <>

        <div className={`${classes['form-group']} ${props.errors[props.name] ? classes['error'] : ''}`}>
            <label htmlFor={props.name}>{props.name}</label>

            <input type="number"
                    id={props.name}
                    className={classes.fields}
                    placeholder={props.placeholder}
                    onInput={props.moveToNextFocus}
                    {...props.register(props.name, {
                                        ...props.validation,
                                        valueAsNumber: true
                                    })
                    }
            />

            <p>{props.errors[props.name]?.message}</p>
        </div>

    </>
}

export default NumberInput;