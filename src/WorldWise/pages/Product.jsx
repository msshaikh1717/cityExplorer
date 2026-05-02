import styles from "./Product.module.css";

function Product() {
  return (
    <main className={styles.container}>
      <img src="/img-1.jpg" className={styles.img} alt="WorldWide app screenshot" />
      <div className={styles.description}>
        <h1 className={styles.heading}>About WorldWide</h1>
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
    </main>
  );
}

export default Product;
