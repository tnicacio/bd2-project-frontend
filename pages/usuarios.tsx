import styles from '../styles/pages/Usuarios.module.css';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { UserModal } from '../components/UserModal';

export default function Usuarios({ usuarios }) {
  const { isUserModalOpen, openUserModal } = useContext(ModalContext);
  const [filter, setFilter] = useState('');
  const [userList, setUserList] = useState(usuarios);

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (filter !== null && usuarios !== null) {
      const results = usuarios.filter((user) => {
        return user.nome.toLowerCase().includes(filter.toLowerCase());
      });
      setUserList(results);
    }
  }, [filter]);

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.novoUser}>
            <button className={styles.btnSignUp} onClick={openUserModal}>
              Cadastrar
            </button>
          </div>
          <div className={styles.filterUser}>
            <input
              type="text"
              value={filter}
              onChange={handleFilter}
              placeholder="Pesquise aqui..."
            />
          </div>

          {userList ? (
            <div className={styles.userList}>
              <table>
                <thead className={styles.tableHead}>
                  <tr className={styles.firstRow} key="products-key">
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map(({ id, nome, email }) => {
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{nome}</td>
                        <td>{email}</td>
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
            'Não há usuários cadastrados'
          )}
        </div>
      </section>
      {isUserModalOpen && (
        <UserModal
          modalTitle={'Novo Usuário'}
          modalSubTitle={'Insira os dados do novo usuário'}
        />
      )}
    </>
  );
}

export const getStaticProps = async () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/usuarios');
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
      usuarios: data,
    },
  };
};
