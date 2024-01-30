import css from './Techs.module.css';
const Techs = () => {
  return (
    <section className={css.tech}>
      <h2 className={css.tech__h2subtitle}>Технологии</h2>
      <div className={css.tech__line}></div>
      <h3 className={css.tech__h3subtitle}>7 технологий</h3>
      <p className={css.tech__text}>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className={css.tech__types}>
        <p className={css.tech__type}>HTML</p>
        <p className={css.tech__type}>CSS</p>
        <p className={css.tech__type}>JS</p>
        <p className={css.tech__type}>React</p>
        <p className={css.tech__type}>Git</p>
        <p className={css.tech__type}>Express.js</p>
        <p className={css.tech__type}>mongoDB</p>
      </div>
    </section>
  );
};
export default Techs;
