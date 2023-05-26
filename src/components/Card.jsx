import React, { useRef } from 'react';
import classes from '../scss/Card.module.css'
import downArrow from '../assets/downArrow.svg'
import NumberInput from './NumberInput'
import { useForm, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Card = () => {
    const defaultResult = "- - ";

    // const { register, formState, control, handleSubmit, setError } = useForm();
    const methods = useForm();
    const { formState: { isSubmitting }, control, setError, setFocus, setValue } = methods;

    const dayResultRef = useRef();
    const monthResultRef = useRef();
    const yearResultRef = useRef();
    const submitRef= useRef();


    const resetResult = () => {
        yearResultRef.current.innerText = defaultResult;
        monthResultRef.current.innerText = defaultResult;
        dayResultRef.current.innerText = defaultResult;
    }

    const invalidDate = (year, month, day) => {
        const inputDate = new Date(year, month, day);

        if (!(inputDate.getFullYear() == year &&
            inputDate.getMonth() == month &&
            inputDate.getDate() == day)) {

            setError("day", {
                type: "invalidDate",
                message: "Must be a valid date"
            });
            setError("month", {
                type: "invalidDate",
                message: ""
            });
            setError("year", {
                type: "invalidDate",
                message: ""
            });

            return true;
        }

        // Is a valid date
        return false;
    }

    const calculateAge = (start, end) => {
        const startYear = start.getFullYear();
        const startMonth = start.getMonth();
        const startDateOfMonth = start.getDate();

        const endYear = end.getFullYear();
        const endMonth = end.getMonth();
        const endDateOfMonth = end.getDate();

        let years = endYear - startYear;
        let months = endMonth - startMonth;
        let days = endDateOfMonth - startDateOfMonth;

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            const lastMonthStartDate = new Date(endYear, endMonth - 1, 1);
            const lastMonthEndDate = new Date(endYear, endMonth, 0);
            const lastMonthDays = lastMonthEndDate.getDate();
            days = lastMonthDays - startDateOfMonth + endDateOfMonth;
            months--;
        }

        return {
            years: years,
            months: months,
            days: days
        }
    }

    const countUp = (element, target, duration) => {
        return new Promise((resolve) => {
            let count = 0;
            const interval = Math.ceil(duration / target);

            const countInterval = setInterval(() => {
                count++;
                element.current.innerText = count;

                if (count >= target) {
                    clearInterval(countInterval);
                    resolve();
                }
            }, interval);
        });
    }

    const calculateAgeHandler = async (formValues) => {
        // Clear previous results
        resetResult();

        // Parse values to integer
        const year = formValues.year;
        const month = formValues.month-1;
        const day = formValues.day;

        // Cancel form submission if inputs equal an invalid date
        if (invalidDate(year, month, day)) {
            return;
        }

        // Calculate age
        const inputDate = new Date(year, month, day);
        const currentDate = new Date();
        const results = calculateAge(inputDate, currentDate);

        // Display results
        try {
            await countUp(yearResultRef, results.years, 1000);
            await countUp(monthResultRef, results.months, 200);
            await countUp(dayResultRef, results.days, 400);
        } catch (error) {
            console.error("CountUp Error:", error);
        }

        // Return focus to first input field
        const dayInput = document.getElementById("day");
        // dayInput.focus();
        // dayInput.select();
    }

    const moveFocusHandler = (e, nextElement, charLimit) => {
        const value = e.target.value;
        const currentInputName = e.target.id;

        if (value.length >= charLimit) {

            // Slice excess chars after limit reached
            if (value.length > charLimit) {
                const maxValueOnly = value.slice(0, charLimit);
                setValue(currentInputName, maxValueOnly);
            }

            // Focus on ref button that is not managed by React-Hook-Form
            if (charLimit === 4) {
                submitRef.current.focus();
                return;
            }

            setFocus(nextElement);
        }
    }

    const twoDigitBlurHandler = (e) => {
        const value = e.target.value;
        const currentInputName = e.target.id;

        if (value > 0 && value < 10) {
            const twoDigitConversion = value.toString().padStart(2, "0");
            setValue(currentInputName, twoDigitConversion);
        }
    }


    const dayValidationRules = {
        required: "This field is required",
        validate: {
            outsideDayRange: (value) => {
                return (
                    !(value < 1 || value > 31) || "Must be a valid day"
                )
            }
        }
    }

    const monthValidationRules = {
        required: "This field is required",
        validate: {
            outsideMonthRange: (value) => {
                return (
                    !(value < 1 || value > 12) || "Must be a valid month"
                )
            }
        }
    }

    const yearValidationRules = {
        required: "This field is required",
        validate: {
            outsideYearRange: (value) => {
                const currentYear = new Date().getFullYear();
                return (
                    !(value > currentYear) || "Must be in the past"
                )
            }
        }
    }

    return <article className={classes.card}>
        <div className={classes['card-body']}>
        <FormProvider {...methods}> {/* pass all methods into the context */}

            <NumberInput placeholder="DD"
                        name="day"
                        moveFocusHandler={e => { moveFocusHandler(e, 'month', 2) } }
                        twoDigitBlurHandler={twoDigitBlurHandler}
                        validation={dayValidationRules} />

            <NumberInput placeholder="MM"
                        name="month"
                        moveFocusHandler={e => { moveFocusHandler(e, 'year', 2) } }
                        twoDigitBlurHandler={twoDigitBlurHandler}
                        validation={monthValidationRules} />

            <NumberInput placeholder="YYYY"
                        name="year"
                        moveFocusHandler={e => { moveFocusHandler(e, "btnCalculateAge", 4) } }
                        validation={yearValidationRules} />

            <button className={classes['btn-primary']}
                    aria-label="Submit to calculate age"
                    ref={submitRef}
                    disabled={isSubmitting}
                    onClick={methods.handleSubmit(calculateAgeHandler)}>
                <img alt="" src={downArrow} />
            </button>

        </FormProvider>
        </div>

        <div className={classes['card-results']}>
            <h1 className={classes['result']}><span ref={yearResultRef}>- - </span>years</h1>
            <h2 className={classes['result']}><span ref={monthResultRef}>- - </span>months</h2>
            <h3 className={classes['result']}><span ref={dayResultRef}>- - </span>days</h3>
        </div>

        {/* <DevTool control={control} /> */}
    </article>
}

export default Card;
