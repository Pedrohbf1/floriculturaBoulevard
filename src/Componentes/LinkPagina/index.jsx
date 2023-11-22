import styles from './linkPagina.module.css'
import { Link, useLocation } from 'react-router-dom'

const LinkPagina = ({ children, to }) => {

    const localizacao = useLocation()

    return (
        <div>
            <Link
                className={`
                    ${styles.link}
                    ${localizacao.pathname === to ? styles.linkDestacado : ""}
                `}
                to={to}
        
            >
                {children}
            </Link>
        </div>
    )
}

export default LinkPagina