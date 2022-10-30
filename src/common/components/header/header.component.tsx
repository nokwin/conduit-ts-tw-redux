import clsx from 'clsx';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container } from '../container/container.component';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx('py-navItem hover:text-black/60 hover:no-underline', {
      'text-black/30': !isActive,
      'text-black/80': isActive,
    });

  return (
    <header>
      <nav className="px-2 py-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="font-titillilum text-2xl mr-8 text-conduit-green"
            >
              conduit
            </Link>
            <ul className="pl-0 mb-0 list-none flex">
              <li>
                <NavLink to="/" className={navLinkClasses} end>
                  Home
                </NavLink>
              </li>
              <li className="ml-4">
                <NavLink to="/sign-in" className={navLinkClasses}>
                  Sign in
                </NavLink>
              </li>
              <li className="ml-4">
                <NavLink to="/sign-up" className={navLinkClasses}>
                  Sign up
                </NavLink>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
};
