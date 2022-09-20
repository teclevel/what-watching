import Logo from '../logo/logo';

function Footer() {
  const classLogoFooter = 'logo__link--light';

  return (
    <footer className="page-footer">
      <div className="logo">
        <Logo className={classLogoFooter} />
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
