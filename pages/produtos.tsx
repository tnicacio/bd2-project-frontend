import styles from '../styles/pages/Produtos.module.css';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { ProductModal } from '../components/ProductModal';

export default function Produtos({ produtos }) {
  const { isProductModalOpen, openProductModal } = useContext(ModalContext);
  const [filter, setFilter] = useState('');
  const [productList, setProductList] = useState(produtos);

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (filter !== null && produtos !== null) {
      const results = produtos.filter((product) => {
        return product.descricao.toLowerCase().includes(filter.toLowerCase());
      });
      setProductList(results);
    }
  }, [filter]);

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.novoProduct}>
            <button className={styles.btnSignUp} onClick={openProductModal}>
              Cadastrar
            </button>
          </div>
          <div className={styles.filterProduct}>
            <input
              type="text"
              value={filter}
              onChange={handleFilter}
              placeholder="Pesquise aqui..."
            />
          </div>

          {productList ? (
            <div className={styles.productList}>
              <table>
                <thead className={styles.tableHead}>
                  <tr className={styles.firstRow} key="products-key">
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Preço unitário</th>
                    <th>Estoque</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(({ id, descricao, preco, qtEstoque }) => {
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{descricao}</td>
                        <td>R$ {preco}</td>
                        <td>{qtEstoque}</td>
                        <td>
                          <a className={styles.editBtn} href="#">
                            editar
                          </a>
                        </td>
                        <td>
                          <a className={styles.excludeBtn} href="#">
                            excluir
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            'Não há produtos cadastrados'
          )}
        </div>
      </section>
      {isProductModalOpen && <ProductModal />}
    </>
  );
}

export const getStaticProps = async () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produtos');
      const data = response?.data;
      const dataArray = Array.from(data);
      return dataArray;
    } catch (err) {
      console.log(err);
    }
  };

  const data = await fetchData();
  return {
    props: {
      produtos: data,
    },
  };
};
