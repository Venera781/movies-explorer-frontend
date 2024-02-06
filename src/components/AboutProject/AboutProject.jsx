import css from './AboutProject.module.css';

const AboutProject = () => {
  return (
    <section id="aboutproject" className={css.about}>
      <h2 className={css.about__h2subtitle}>О проекте</h2>
      <div className={css.about__table}>
        <article className={css.about__tableitem}>
          <h3 className={css.about__subtitle}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={css.about__text}>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className={css.about__tableitem}>
          <h3 className={css.about__subtitle}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={css.about__text}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className={css.about__duration}>
        <div className={css.about__wrapperone}>
          <p className={css.about__oneweek}>1 неделя</p>
          <p className={css.about__fourweek}>4 недели</p>
        </div>
        <div className={css.about__wrappertwo}>
          <p className={css.about__back}>Back-end</p>
          <p className={css.about__front}>Front-end</p>
        </div>
      </div>
    </section>
  );
};
export default AboutProject;
