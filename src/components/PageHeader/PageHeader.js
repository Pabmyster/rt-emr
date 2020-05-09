import React from 'react';
import styles from "./PageHeader.module.css"

function PageHeader({children, title}) {
    return (
        <div className={styles.PageHeader}>
            <div className={styles.Title}>
                {title}
            </div>
            <div className={styles.Actions}>
                {children}
            </div>
        </div>
    );
}

export default PageHeader;