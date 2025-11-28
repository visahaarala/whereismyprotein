import styles from './Info.module.scss';

const Info = ({ show }: { show: boolean }) => {
  return (
    <div className={styles.info} style={{ display: show ? 'flex' : 'none' }}>
      <div className={styles.results}>
        <h3>What is this..?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, magnam
          incidunt soluta rem reprehenderit et similique adipisci eum corporis
          libero velit quasi laborum eveniet quae voluptatem quisquam pariatur
          explicabo odio ipsum id. Omnis maxime laboriosam voluptatum aliquam
          cupiditate, exercitationem pariatur eum distinctio saepe corporis aut.
          Animi id non mollitia, sit itaque facere pariatur voluptas
          necessitatibus tenetur, provident ad earum consequuntur odio commodi
          labore, reiciendis ullam.
        </p>
        <h3>Fineli</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis est
          cum ad totam ducimus cupiditate. Voluptatum quisquam pariatur modi
          dolor. Repudiandae at quibusdam dicta inventore, atque quod earum
          recusandae id!
        </p>
        <h3>USDA</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          dolorem laborum ea facere nihil in at culpa nam aut nisi hic optio et,
          debitis quae porro incidunt! Iusto rerum deserunt autem, fuga dolor
          ipsa excepturi et molestiae ullam sit suscipit repellendus, at, illum
          corporis velit vel sed porro consequuntur quo harum facilis? Eos
          accusamus dolore porro ipsam hic! Ratione, libero quos! Laborum
          dolorem nesciunt, sapiente odio numquam provident deleniti minima est
          illo corporis sequi cupiditate qui dolore optio vel eaque?
        </p>
      </div>
    </div>
  );
};

export default Info;
