import styles from '../styles/components/VendaModal.module.css';
import { useContext, useRef, useState, useEffect } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import axios from 'axios';

interface IProduto {
  id: number;
}

interface IItens {
  produto: IProduto;
  qtProduto: number;
}

interface IUser {
  id: number;
}

interface ICadastro {
  isPagtoPrazo: boolean;
  nrParcelas: number;
  usuario: IUser;
  itens: IItens[];
}

export function VendaModal(props: any) {
  const { closeVendaModal } = useContext(ModalContext);
  const [isPagtoPrazo, setIsPagtoPrazo] = useState(false);
  const [nrParcelas, setNrParcelas] = useState(0);
  const [usuarioLogado, setUsuarioLogado] = useState({ id: 1 });
  const [listItens, setListItens] = useState([]);

  const [filter, setFilter] = useState('');
  const [produtosListModal, setProdutosListModal] = useState(props.produtos);

  let ref = useRef();
  let { overlayProps } = useOverlay(props, ref);
  let { dialogProps } = useDialog(props, ref);

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    console.log(props.produtos);
    if (filter !== null && props.produtos !== null) {
      const results = props.produtos.filter((produto) => {
        return produto.descricao.toLowerCase().includes(filter.toLowerCase());
      });
      setProdutosListModal(results);
    }
  }, [filter]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const itensList = [];

    const vendaObject: ICadastro = {
      isPagtoPrazo: isPagtoPrazo,
      nrParcelas: nrParcelas,
      usuario: usuarioLogado,
      itens: listItens,
    };

    //TO-DO: insert venda e itens da venda

    console.log('***handleSubmit', vendaObject);
  };

  console.log(props.vendas);
  return (
    <FocusScope contain autoFocus>
      <div className={styles.overlay}>
        <div
          className={styles.container}
          ref={ref}
          {...overlayProps}
          {...dialogProps}
        >
          <header>
            <h1> {props.modalTitle ?? 'Nova Venda'}</h1>
            <p> {props.modalSubTitle ?? 'Insira os dados da nova venda'}</p>
          </header>
          <form className={styles.formRegister} onSubmit={handleSubmit}>
            <div className={styles.pagtoPrazo}>
              <div className={styles.checkboxInput}>
                <input
                  id="isPagtoPrazo"
                  type="checkbox"
                  name="isPagtoPrazo"
                  onChange={() => setIsPagtoPrazo(!isPagtoPrazo)}
                />
              </div>
              <div className={styles.checkboxLabel}>
                <label htmlFor="isPagtoPrazo">À Prazo?</label>
              </div>
            </div>

            <div className={styles.secondRow}>
              <div>
                <label htmlFor="nrParcelas">Nr. Parcelas</label>
                <input
                  id="nrParcelas"
                  type="number"
                  name="nrParcelas"
                  onChange={(e) => setNrParcelas(Number(e.currentTarget.value))}
                  value={nrParcelas || 0}
                />
              </div>
              <div>
                <label htmlFor="usuarioLogado">Usuário ID</label>
                <input
                  id="usuarioLogado"
                  type="number"
                  name="usuarioLogado"
                  onChange={(e) =>
                    setUsuarioLogado({ id: Number(e.currentTarget.value) })
                  }
                  value={usuarioLogado.id || 0}
                />
              </div>
            </div>

            <div className={styles.itensContainer}>
              <div className={styles.filterProduto}>
                <input
                  type="text"
                  value={filter}
                  onChange={handleFilter}
                  placeholder="Pesquise pelo produto..."
                />
              </div>
              <div className={styles.produtosList}>
                <table>
                  <thead className={styles.tableHead}>
                    <tr className={styles.firstRow} key="vendas-key">
                      <th>Código</th>
                      <th>Descrição</th>
                      <th>Preço unitário</th>
                      <th>Estoque</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosListModal &&
                      produtosListModal.map(
                        ({ id, descricao, preco, qtEstoque }) => {
                          return (
                            <tr key={id}>
                              <td>{id}</td>
                              <td>{descricao}</td>
                              <td>R$ {preco}</td>
                              <td>{qtEstoque}</td>
                              <td>
                                <a className={styles.editBtn} href="#">
                                  adicionar
                                </a>
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
              <p>Seu carrinho:</p>
              <div className={styles.carrinho}></div>
              <p>
                Total do pedido: <span>{`R$ ${'100,00'}`}</span>{' '}
              </p>
            </div>

            <div className={styles.submitContainer}>
              <button className={styles.submitRegister} type="submit">
                Finalizar Pedido
              </button>
              <button
                className={styles.cancelRegister}
                onClick={closeVendaModal}
              >
                Cancelar
              </button>
            </div>
            <button
              className={styles.closeRegister}
              type="button"
              onClick={closeVendaModal}
            >
              <img src="close.svg" alt="Fechar Cadastro" />
            </button>
          </form>
        </div>
      </div>
    </FocusScope>
  );
}
