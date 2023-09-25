import s from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={s.container}>
        <div className={s.wrapper}>
          <a
            href='https://dexola.com'
            rel='noopener noreferrer'
            target='_blank'
            className={s.text}
          >
            Designed by Dexola - 2023
          </a>
          <p className={s.text}>© All rights reserved</p>
        </div>
      </div>
      <div className='gradientBackground'></div>
    </footer>
  );
};
