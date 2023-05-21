import styles from '../scss/Attribution.module.css';

const Attribution = () => {
    return(
        <footer className={styles.attribution}>
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>.
            Coded by <a href="https://www.frontendmentor.io/profile/artimys" target="_blank"  rel="noopener noreferrer">Arty Simon</a>.
        </footer>
    );
};

export default Attribution;