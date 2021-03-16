import styles from '../styles/pages/Login.module.css';
import { useState, useContext } from 'react';
import Link from 'next/link';
import { ModalContext } from '../contexts/ModalContext';
import { UserModal } from '../components/UserModal';

interface ILogin {
  email: string;
  senha: string;
}

export default function Login() {
  const { isUserModalOpen, openUserModal } = useContext(ModalContext);
  const [formValues, setFormValues] = useState<ILogin>({
    email: '',
    senha: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const userObject: ILogin = {
      email: String(data?.email),
      senha: String(data?.senha),
    };
    //TO-DO: Login
  };

  function handleSignUp(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.signInUpContainer}>
          <h1> Login - PG4</h1>

          <form action="#" className={styles.formLogin} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seu@email.com"
              onChange={handleInputChange}
              value={formValues.email || ''}
            />
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="NotSolarwinds123"
              onChange={handleInputChange}
              value={formValues.senha || ''}
            />
            <div className={styles.buttonGroup}>
              <Link href="produtos">
                <button type="submit" className={styles.btnLogin}>
                  Login
                </button>
              </Link>
              <button className={styles.btnSignUp} onClick={openUserModal}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      {isUserModalOpen && <UserModal />}
    </>
  );
}
