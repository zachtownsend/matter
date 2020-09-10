import React from 'react';
import Link from 'next/link';
import Container from './Container';
import Logo from './Logo';
import styles from '../styles/Header.module.scss';
import AccountLogo from './AccountLogo';
import CartIcon from './CartIcon';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Header = () => {
    // const { isMenuOpen, toggleMenuOpen } = useContext(StoreContext);

    return (
        <header>
            <Container className="flex-grow-0">
                <div className={styles.grid}>
                    <div className="flex place-content-center">
                        <button onClick={toggleMenuOpen}>Hamburger</button>
                    </div>
                    <div className="flex place-content-center">
                        <Link href="/">
                            <a className={styles.logoLink}>
                                <Logo className={styles.logo} />
                            </a>
                        </Link>
                    </div>
                    <div className="flex place-content-center">
                        <ul className="flex">
                            <li className="flex place-items-center">
                                <button className="w-12 h-12 flex place-items-center">
                                    <AccountLogo />
                                </button>
                            </li>
                            <li className="flex place-items-center">
                                <button className="w-12 h-12 flex place-items-center">
                                    <CartIcon />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
