import styles from "./Product.module.css";

function Pricing() {
  return (
    <main className={styles.container}>
      <div className={styles.description}>
        <h1 className={styles.heading}>
          Simple pricing.
          <br />
          Just $9/month.
        </h1>
        <p className={styles.text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
          facilis, blanditiis deserunt natus error assumenda id neque porro
          aspernatur laudantium soluta corporis sunt nisi veritatis quo ad ea
          libero iusto.
        </p>
        <p className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quisquam
          voluptatum minus dolore dolorum nihil itaque ipsa sit optio
          consequuntur.
        </p>
      </div>
      <img src="/img-2.jpg" className={styles.img} alt="Pricing details" />
    </main>
  );
}

export default Pricing;
