import React from 'react';
import styles from "./Sidebar.module.css"


function SidebarHeader({text}) {
    return (
        <li className={styles.SidebarHeader}>
            <div>
                {text}
            </div>
        </li>
    );
}

export default SidebarHeader;