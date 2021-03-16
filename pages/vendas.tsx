import styles from '../styles/pages/Vendas.module.css';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { VendaModal } from '../components/VendaModal';

export default function Vendas({ vendas, produtos }) {
  const [filter, setFilter] = useState('');
  const [vendaList, setVendaList] = useState(vendas);
  const [selectedVenda, setSelectedVenda] = useState(0);
  const [itensVenda, setItensVenda] = useState([]);

  const { isVendaModalOpen, openVendaModal } = useContext(ModalContext);

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  function handleSelectedVenda(event) {
    setSelectedVenda(Number(event.currentTarget.id));
  }

  useEffect(() => {
    if (filter !== null && vendas !== null) {
      const results = vendas.filter((venda) => {
        return venda.usuario.nome.toLowerCase().includes(filter.toLowerCase());
      });
      setVendaList(results);
    }
  }, [filter]);

  useEffect(() => {
    const itensDaVenda = getItens(selectedVenda);
    setItensVenda(itensDaVenda);
  }, [selectedVenda]);

  function handleNovaVenda() {}

  function getItens(vendaId: number) {
    if (vendaId > 0) {
      const vendaClicada = vendas.find((venda) => venda.id === vendaId);
      return vendaClicada?.itens || [];
    }
    return [];
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.listaVendas}>
            <div className={styles.novaVenda}>
              <button className={styles.btnSignUp} onClick={openVendaModal}>
                Cadastrar
              </button>
            </div>
            <div className={styles.filterVenda}>
              <input
                type="text"
                value={filter}
                onChange={handleFilter}
                placeholder="Pesquise pelo cliente..."
              />
            </div>
            {vendaList && (
              <table>
                <thead className={styles.tableHead}>
                  <tr className={styles.firstRow} key="vendas-key">
                    <th>Código</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>À Prazo?</th>
                    <th>Nr. Parcelas</th>
                    <th>Status</th>
                    <th>Data Atualização</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {vendaList.map(
                    ({
                      id,
                      dtVenda,
                      usuario,
                      isPagtoPrazo,
                      nrParcelas,
                      status,
                      dtAtualizacao,
                      total,
                    }) => {
                      const [dtUpdate, hrUpdate] = dtAtualizacao?.split(
                        'T'
                      ) || ['', ''];

                      const hourUpdate = hrUpdate?.substr(0, 5) || '';

                      return (
                        <tr key={id} id={id} onClick={handleSelectedVenda}>
                          <td>{id}</td>
                          <td>{dtVenda.split('T')[0]}</td>
                          <td>{usuario['nome']}</td>
                          <td>{isPagtoPrazo ? 'Sim' : 'Não'}</td>
                          <td>{nrParcelas}</td>
                          <td>{status}</td>
                          <td>{`${dtUpdate} ${hourUpdate}`}</td>
                          <td>{`R$ ${formatNumber(total)}`}</td>
                          <td>
                            <a className={styles.editBtn} href="#">
                              Confirmar
                            </a>
                          </td>
                          <td>
                            <a className={styles.excludeBtn} href="#">
                              Cancelar
                            </a>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className={styles.detalheVenda}>
            <h1>Itens</h1>
            {itensVenda && itensVenda.length > 0 && (
              <table>
                <thead className={styles.tableItensHead}>
                  <tr className={styles.firstRow} key="itens-key">
                    <th>Produto</th>
                    <th>Preço unit.</th>
                    <th>Qtd.</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {itensVenda.map(
                    ({ produto, qtProduto, precoUnitario, subTotal }) => {
                      return (
                        <tr key={produto.id}>
                          <td>{produto.descricao}</td>
                          <td>{`R$ ${formatNumber(precoUnitario)}`}</td>
                          <td>{qtProduto}</td>
                          <td>{`R$ ${formatNumber(subTotal)}`}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
      {isVendaModalOpen && <VendaModal produtos={produtos} />}
    </>
  );
}

export const getStaticProps = async () => {
  const fetchData = async (endereco: string) => {
    try {
      // const response = await axios.get('http://localhost:8080/vendas');
      const response = await axios.get(endereco);
      const data = response?.data;
      const dataArray = Array.from(data);
      return dataArray;
    } catch (err) {
      console.log(err);
    }
  };

  const dataVendas = await fetchData('http://localhost:8080/vendas');
  const dataProdutos = await fetchData('http://localhost:8080/produtos');
  return {
    props: {
      vendas: dataVendas,
      produtos: dataProdutos,
    },
  };
};
