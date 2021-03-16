import styles from '../styles/components/Navbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Navbar() {
  const listActiveItems = ['nav-produtos', 'nav-usuarios', 'nav-vendas'];

  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);

  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <Link href="produtos">
              <a
                id="nav-produtos"
                style={
                  router.pathname === '/produtos' ? { background: 'green' } : {}
                }
              >
                Produtos
              </a>
            </Link>
          </li>
          <li>
            <Link href="usuarios">
              <a
                id="nav-usuarios"
                style={
                  router.pathname === '/usuarios' ? { background: 'green' } : {}
                }
              >
                Usuários
              </a>
            </Link>
          </li>
          <li>
            <Link href="vendas">
              <a
                id="nav-vendas"
                style={
                  router.pathname === '/vendas' ? { background: 'green' } : {}
                }
              >
                Vendas
              </a>
            </Link>
          </li>
          <li className={styles.navLogOut}>
            <Link href="login">
              <a id="nav-log-out">Log Out</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
