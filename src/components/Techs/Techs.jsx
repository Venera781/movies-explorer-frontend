import css from './Techs.module.css';
const Techs = () => {
  return (
    <section id="techs" className={css.tech}>
      <h2 className={css.tech__h2subtitle}>Технологии</h2>
      <div className={css.tech__line}></div>
      <h3 className={css.tech__h3subtitle}>7 технологий</h3>
      <p className={css.tech__text}>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className={css.tech__types}>
        <li className={css.tech__type}>HTML</li>
        <li className={css.tech__type}>CSS</li>
        <li className={css.tech__type}>JS</li>
        <li className={css.tech__type}>React</li>
        <li className={css.tech__type}>Git</li>
        <li className={css.tech__type}>Express.js</li>
        <li className={css.tech__type}>mongoDB</li>
      </ul>
    </section>
  );
};
export default Techs;
