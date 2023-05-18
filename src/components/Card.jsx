import classes from '../scss/Card.module.css'
import downArrow from '../assets/downArrow.svg'

const Card = () => {
    return <article className={classes.card}>
        <section className={classes['card-body']}>
            <div className={classes['form-group']}>
                <label htmlFor="day">DAY</label>
                <input id="day" className={classes.fields} name="day" type="number" placeholder="DD" min="1" max="31" defaultValue="" />
                <p></p>
            </div>

            <div className={classes['form-group']}>
                <label htmlFor="month">MONTH</label>
                <input id="month" className={classes.fields} name="month" type="number" placeholder="MM" min="1" max="12" defaultValue="" />
                <p></p>
            </div>

            <div className={classes['form-group']}>
                <label htmlFor="year">YEAR</label>
                <input id="year" className={classes.fields} name="year" type="number" placeholder="YYYY" defaultValue="" />
                <p></p>
            </div>

            <button id={classes.btnCalculateAge}>
                <img src={downArrow} />
            </button>
        </section>

        <section className={classes['card-results']}>
            <h1 className={classes['result-calculation']}><span id="yearResult">- - </span>years</h1>
            <h2 className={classes['result-calculation']}><span id="monthResult">- - </span>months</h2>
            <h3 className={classes['result-calculation']}><span id="dayResult">- - </span>days</h3>
        </section>
    </article>
}

export default Card;