import classes from '../scss/NumberInput.module.css'
import { useFormContext } from 'react-hook-form'

const NumberInput = (props) => {

    // retrieve all hook methods
    const { register, formState: { errors } } = useFormContext();

    return <>
        <div className={`${classes['form-group']} ${errors[props.name] ? classes['error'] : ''}`}>
            <label htmlFor={props.name}>{props.name}</label>

            <input type="number"
                    id={props.name}
                    className={classes.fields}
                    placeholder={props.placeholder}
                    onInput={props.moveToNextFocus}
                    aria-invalid={errors[props.name] ? "true" : "false"}

                    {...register(props.name, {
                                        ...props.validation,
                                        valueAsNumber: true
                                    })
                    }
            />

            <p role="alert">{errors[props.name]?.message}</p>
        </div>

    </>
}

export default NumberInput;