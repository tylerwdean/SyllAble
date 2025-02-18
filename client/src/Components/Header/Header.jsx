import React from 'react'
import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.header}>
            <h1>SyllAble</h1>
            <h2>Where you're able to build a Syllabus</h2>
        </div>
    )
}

export default Header