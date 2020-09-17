import React from 'react';
import Link from 'next/link';
import Container from './Container';
import Logo from './Logo';
import styles from '../styles/Header.module.scss';
import AccountLogo from './AccountLogo';
import CartIcon from './CartIcon';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import PageBlock from './PageBlock';
import Drawer from './Drawer';
import Nav from './Nav';
import Cart from './Cart';

const Header = () => {
    const {
        isMenuOpen,
        toggleMenuOpen,
        isCartOpen,
        toggleCartOpen,
        closeDrawers,
        isLoading
    } = useContext(StoreContext);

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
                            <li>
                                <button className="w-12 h-12 flex justify-center items-center">
                                    <AccountLogo />
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={toggleCartOpen}
                                    className="w-12 h-12 flex justify-center items-center">
                                    <CartIcon />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
            <PageBlock onClick={closeDrawers} active={isMenuOpen || isCartOpen || isLoading} />
            <Drawer open={isMenuOpen} side="left">
                <Nav />
            </Drawer>
            <Drawer open={isCartOpen} side="right">
                <button onClick={toggleCartOpen}>Close</button>
                <Cart />
            </Drawer>
        </header>
    );
};

export default Header;
