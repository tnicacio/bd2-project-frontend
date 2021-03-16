import styles from '../styles/components/UserModal.module.css';
import { useContext, useRef, useState } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import axios from 'axios';

interface ICadastro {
  nome: string;
  email: string;
  senha: string;
}

export function UserModal(props: any) {
  const { closeUserModal } = useContext(ModalContext);
  const [formValues, setFormValues] = useState<ICadastro>({
    nome: '',
    email: '',
    senha: '',
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
      nome: String(data?.name),
      email: String(data?.email),
      senha: String(data?.password),
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
            <h1> {props.modalTitle ?? 'Cadastre-se'}</h1>
            <p> {props.modalSubTitle ?? 'É rápido e fácil!'}</p>
          </header>
          <form className={styles.formRegister} onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formValues.nome || ''}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formValues.email || ''}
            />
            <label htmlFor="password">Senha</label>
            <input
              id="senha"
              type="password"
              name="senha"
              onChange={handleInputChange}
              value={formValues.senha || ''}
            />
            <div className={styles.submitContainer}>
              <button className={styles.submitRegister} type="submit">
                Cadastrar
              </button>
            </div>
            <button
              className={styles.closeRegister}
              type="button"
              onClick={closeUserModal}
            >
              <img src="close.svg" alt="Fechar Cadastro" />
            </button>
          </form>
        </div>
      </div>
    </FocusScope>
  );
}
