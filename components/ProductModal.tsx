import styles from '../styles/components/UserModal.module.css';
import { useContext, useRef, useState } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import axios from 'axios';

interface ICadastro {
  descricao: string;
  preco: number;
  qtEstoque: number;
  qtEstoqueMinimo: number;
}

export function ProductModal(props: any) {
  const { closeProductModal } = useContext(ModalContext);
  const [formValues, setFormValues] = useState<ICadastro>({
    descricao: '',
    preco: 0,
    qtEstoque: 0,
    qtEstoqueMinimo: 0,
  });

  let ref = useRef();
  let { overlayProps } = useOverlay(props, ref);
  let { dialogProps } = useDialog(props, ref);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const userObject: ICadastro = {
      descricao: String(data?.descricao),
      preco: Number(data?.preco),
      qtEstoque: Number(data?.qtEstoque),
      qtEstoqueMinimo: Number(data?.qtEstoqueMinimo),
    };

    // const response = await axios.post('/api/users', userObject);

    // const userSavedOnDb = response.data;

    // if (userSavedOnDb._id) {
    //   closeRegisterModal();
    //   signIn(userSavedOnDb);
    // }
    console.log('***handleSubmit', data);
  };

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
            <h1> {props.modalTitle ?? 'Novo Produto'}</h1>
            <p> {props.modalSubTitle ?? 'Insira os dados do produto'}</p>
          </header>
          <form className={styles.formRegister} onSubmit={handleSubmit}>
            <label htmlFor="descricao">Descrição</label>
            <input
              id="descricao"
              type="text"
              name="descricao"
              onChange={handleInputChange}
              value={formValues.descricao || ''}
            />
            <label htmlFor="preco">Preço (R$)</label>
            <input
              id="preco"
              type="number"
              name="preco"
              onChange={handleInputChange}
              value={formValues.preco || 0}
            />
            <label htmlFor="qtEstoque">Estoque</label>
            <input
              id="qtEstoque"
              type="number"
              name="qtEstoque"
              onChange={handleInputChange}
              value={formValues.qtEstoque || 0}
            />
            <label htmlFor="qtEstoqueMinimo">Estoque Mínimo</label>
            <input
              id="qtEstoqueMinimo"
              type="number"
              name="qtEstoqueMinimo"
              onChange={handleInputChange}
              value={formValues.qtEstoqueMinimo || 0}
            />
            <div className={styles.submitContainer}>
              <button className={styles.submitRegister} type="submit">
                Cadastrar
              </button>
            </div>
            <button
              className={styles.closeRegister}
              type="button"
              onClick={closeProductModal}
            >
              <img src="close.svg" alt="Fechar Cadastro" />
            </button>
          </form>
        </div>
      </div>
    </FocusScope>
  );
}
