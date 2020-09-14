import React from 'react';
import Link from 'next/link';
import Container from './Container';
import Logo from './Logo';
import styles from '../styles/Header.module.scss';
import AccountLogo from './AccountLogo';
import CartIcon from './CartIcon';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import NavDrawer from './NavDrawer';
import PageBlock from './PageBlock';
import { AnimatePresence } from 'framer-motion';

const Header = () => {
    const { isMenuOpen, toggleMenuOpen } = useContext(StoreContext);

    return (
        <header>
            <Container className="flex-grow-0">
                <div className={styles.grid}>
                    <div className="flex justify-items-start items-center">
                        <button
                            className="w-12 h-12 flex justify-center items-center"
                            onClick={toggleMenuOpen}>
                            <span className={styles.hamburger}></span>
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <a className={styles.logoLink}>
                                <Logo className={styles.logo} />
                            </a>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
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
            <PageBlock onClick={toggleMenuOpen} active={isMenuOpen} />
            <NavDrawer open={isMenuOpen} />
        </header>
    );
};

export default Header;
