import css from './AboutMe.module.css';
const AboutMe = () => {
  return (
    <section className={css.aboutme}>
      <h2 className={css.aboutme__h2subtitle}>Студент</h2>
      <div className={css.aboutme__line}></div>
      <img
        className={css.aboutme__photo}
        src="/images/photostudent.jpg"
        alt="Фотография"
      />
      <h3 className={css.aboutme__h3subtitle}>Виталий</h3>
      <p className={css.aboutme__profession}>Фронтенд-разработчик, 30 лет</p>
      <p className={css.aboutme__description}>
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <p className={css.aboutme__github}>Github</p>
    </section>
  );
};
export default AboutMe;
